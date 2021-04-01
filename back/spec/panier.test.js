const request = require('supertest');
const { response } = require('../app');
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')
require('./factories/burger').factory
const factory = require('factory-girl').factory

/* Permet de se connecter */
const account = {
    "username": "user",
    "password": "user"
};


/* Permet de récupérer le token de la connexion */
let access_token = null;
/* Permet de récupérer l'id de la connexion */
let user_id = null;

beforeAll(async () => {
    responseLogin= await request(app).post('/users/login').set('Content-Type', 'application/json').send(account).catch((e) => console.log(e));
    access_token = responseLogin.body.access_token;
    user_id = responseLogin.body.id;
});

afterAll(async () => {
    //await cleanDb(db)
    // await db.close()
});

function getRandomArbitrary(max) {
    return Math.floor(Math.random() * max);
}

describe('Get and Add Burgers in Carts', () => {

    /* Permet d'initier un panier pour mon utilisateur */
    const cart = {
        "UserId": 1,
    };

    /* Permet d'ajouter un burger au panier de mon utilisateur */
    const burger1_cart = {
        "UserId": 1,
        "BurgerId": 1,
        "qte": 3
    }
    /* Permet d'ajouter un autre burger au panier de mon utilisateur */
    const burger2_cart = {
        "UserId": 1,
        "BurgerId": 1
    }

    beforeEach(async () => {
        await factory.createMany('Burgers', 20)


        /* Je récupère l'id de la connexion */
        cart.UserId = user_id;
        burger1_cart.UserId = user_id;
        burger2_cart.UserId = user_id;


        /* J'obtiens les burgers */
        responseBurgers = await request(app).get('/burgers').set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');
        burgers = responseBurgers.body;


        /* Je crée un cart pour mon user  */
        responsePostCart = await request(app).post('/carts/').set('Content-Type', 'application/json').set('Authorization', `Bearer ${access_token}`).send(cart).catch((e) => console.log(e));


        /* J'obtiens le cart de mon utilisateur  */
        responseCartsUsersID = await request(app).get(`/carts/${cart.UserId}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');


        /* Je récupère deux burgeurs aléatoires et j'ajoute dans mon cart (mon premier burgeur aura 3 de quantité et le deuxième 1) */
        burger1_cart.BurgerId = burgers[getRandomArbitrary(burgers.length)].id
        burger2_cart.BurgerId = burgers[getRandomArbitrary(burgers.length)].id
        responsePostburger1_cartCart = await request(app).post('/carts/burger').set('Content-Type', 'application/json').set('Authorization', `Bearer ${access_token}`).send(burger1_cart).catch((e) => console.log(e))
        responsePostburger2_cartCart = await request(app).post('/carts/burger').set('Content-Type', 'application/json').set('Authorization', `Bearer ${access_token}`).send(burger2_cart).catch((e) => console.log(e))

    })

    test('Cart CRUD Response', async () => {

        
        /* J'obtiens les burgers */
        expect(responseBurgers.statusCode).toBe(200);

        /* Je crée un cart pour mon user  */
        expect(responsePostCart.statusCode).toBe(200);

        /* J'obtiens le cart de mon utilisateur (Vide) */
        expect(responseCartsUsersID.statusCode).toBe(200);
        expect(responseCartsUsersID.body.cart).toStrictEqual([]);
        expect(responseCartsUsersID.body.total).toBe(0);


        /* Je récupère deux burgeurs aléatoires et j'ajoute dans mon cart (mon premier burgeur aura 3 de quantité et le deuxième 1) */
        expect(responsePostburger1_cartCart.statusCode).toBe(200);
        expect(responsePostburger2_cartCart.statusCode).toBe(200);
    });
});

describe('Add/Remove Burger In Carts', () => {

    /* Permet d'ajouter une quantité à un burger du panier de mon utilisateur */
    const addburger_cart = {}
    /* Permet d'enlever une quantité à un burger du panier de mon utilisateur */
    const removeburger_cart = {}
    beforeEach(async () => {

        /* Je récupère le cart de mon utilisateur */
        responseCartsofUsers = await request(app).get(`/carts/${user_id}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');

        /* Pour mon premier burger, j'ajoute dans mon cart une quantité  */
        addburger_cart.CartId = responseCartsofUsers.body.cartId;
        addburger_cart.BurgerId = responseCartsofUsers.body.cart[0].BurgerId;
        responsePutAddBurger = await request(app).put('/carts/burger/add').set('Content-Type', 'application/json').set('Authorization', `Bearer ${access_token}`).send(addburger_cart).catch((e) => console.log(e))


        /* Pour mon deuxième burger, j'enlève dans mon cart une quantité (il sera donc enlevée) */
        removeburger_cart.CartId = responseCartsofUsers.body.cartId;
        removeburger_cart.BurgerId = responseCartsofUsers.body.cart[1].BurgerId;
        responsePutRemoveBurger = await request(app).put('/carts/burger/remove').set('Content-Type', 'application/json').set('Authorization', `Bearer ${access_token}`).send(removeburger_cart).catch((e) => console.log(e))

        /* Je récupère le cart de mon utilisateur où maintenant on a plus que 1 burger  */
        responseCartsUsers = await request(app).get(`/carts/${user_id}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');


    });

    test('Crud Add/Remove Burger in Cart', () => {
        
        /* Je récupère le cart de mon utilisateur */
        expect(responseCartsofUsers.statusCode).toBe(200);
        expect(responseCartsofUsers.body.cart.length).toStrictEqual(2);
        expect(responseCartsofUsers.body.total > 0).toBe(true);


        /* Pour mon premier burger, j'ajoute dans mon cart une quantité  */
        expect(responsePutAddBurger.statusCode).toBe(200);
        /* Pour mon deuxième burger, j'enlève dans mon cart une quantité (il sera donc enlevée) */
        expect(responsePutRemoveBurger.statusCode).toBe(200);


        /* Je récupère le cart de mon utilisateur où maintenant on a plus que 1 burger  */
        expect(responseCartsUsers.statusCode).toBe(200);
        expect(responseCartsUsers.body.cart.length).toStrictEqual(1);
        expect(responseCartsUsers.body.total > 0).toBe(true);
    });

})

describe('Delete Carts', () => {
    
    beforeEach(async () => {

        /* Je récupère le cart de mon utilisateur */
        responseCartsofUsers = await request(app).get(`/carts/${user_id}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');


        /* Je supprime mon cart  */
        responseCartsDeleted = await request(app).delete(`/carts/${user_id}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');


        /* J'obtiens le cart de mon utilisateur supprimer mais le serveur regenere un cart  */
        responseCartsUsersIDDeleted = await request(app).get(`/carts/${user_id}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');
   

    });

    test('Delete Cart', () => {

        /* Je récupère le cart de mon utilisateur */
        expect(responseCartsofUsers.statusCode).toBe(200);
        expect(responseCartsofUsers.body.cart.length).toStrictEqual(1);
        expect(responseCartsofUsers.body.total > 0).toBe(true);


        /* Je supprime mon cart  */
        expect(responseCartsDeleted.statusCode).toBe(200);

        /* J'obtiens le cart de mon utilisateur supprimer mais le serveur regenere un cart  */
        expect(responseCartsUsersIDDeleted.statusCode).toBe(200);
    });

})




