const request = require('supertest');
const { response } = require('../app');
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')
require('./factories/burger').factory
const factory = require('factory-girl').factory


beforeAll(async () => {
    await cleanDb(db);
});

afterAll(async () => {
    //await cleanDb(db)
    // await db.close()
});

function getRandomArbitrary(max) {
    return Math.floor(Math.random() * max);
}

describe('Get and Add Burgers in Paniers', () => {

    const account = {
        "username": "user",
        "password": "user"
    };
    const panier = {
        "UserId": 1,
    };

    const burger1_panier = {
        "UserId": 1,
        "BurgerId": 1,
        "qte": 3
    }
    const burger2_panier = {
        "UserId": 1,
        "BurgerId": 1
    }

    beforeEach(async () => {
        await factory.createMany('Burgers', 20)


        /* Je me connecte pour un token */
        responseLogin = await request(app).post('/users/login').set('Content-Type', 'application/json').send(account).catch((e) => console.log(e));
        const access_token = responseLogin.body.access_token;
        panier.UserId = responseLogin.body.id;
        burger1_panier.UserId = responseLogin.body.id;
        burger2_panier.UserId = responseLogin.body.id;


        /* J'obtiens les burgers */
        responseBurgers = await request(app).get('/burgers').set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');
        burgers = responseBurgers.body;


        /* Je crée un panier pour mon user  */
        responsePostPanier = await request(app).post('/paniers/').set('Content-Type', 'application/json').set('Authorization', `Bearer ${access_token}`).send(panier).catch((e) => console.log(e));


        /* J'obtiens le panier de mon utilisateur  */
        responsePaniersUsersID = await request(app).get(`/paniers/${panier.UserId}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');


        /* Je récupère deux burgeurs aléatoires et j'ajoute dans mon panier (mon premier burgeur aura 3 de quantité et le deuxième 1) */
        burger1_panier.BurgerId = burgers[getRandomArbitrary(burgers.length)].id
        burger2_panier.BurgerId = burgers[getRandomArbitrary(burgers.length)].id
        responsePostburger1_panierPanier = await request(app).post('/paniers/burger').set('Content-Type', 'application/json').set('Authorization', `Bearer ${access_token}`).send(burger1_panier).catch((e) => console.log(e))
        responsePostburger2_panierPanier = await request(app).post('/paniers/burger').set('Content-Type', 'application/json').set('Authorization', `Bearer ${access_token}`).send(burger2_panier).catch((e) => console.log(e))

    })

    test('Panier CRUD Response', async () => {

        /* Je me connecte pour un token */
        expect(responseLogin.statusCode).toBe(200);

        /* J'obtiens les burgers */
        expect(responseBurgers.statusCode).toBe(200);

        /* Je crée un panier pour mon user  */
        expect(responsePostPanier.statusCode).toBe(200);

        /* J'obtiens le panier de mon utilisateur (Vide) */
        expect(responsePaniersUsersID.statusCode).toBe(200);
        expect(responsePaniersUsersID.body.panier).toStrictEqual([]);
        expect(responsePaniersUsersID.body.total).toBe(0);


        /* Je récupère deux burgeurs aléatoires et j'ajoute dans mon panier (mon premier burgeur aura 3 de quantité et le deuxième 1) */
        expect(responsePostburger1_panierPanier.statusCode).toBe(200);
        expect(responsePostburger2_panierPanier.statusCode).toBe(200);
    });
});

describe('Add/Remove Burger In Paniers', () => {

    const account = {
        "username": "user",
        "password": "user"
    };
    const addburger_panier = {}
    const removeburger_panier = {}
    beforeEach(async () => {

        /* Je me connecte pour un token */
        responseLogin = await request(app).post('/users/login').set('Content-Type', 'application/json').send(account).catch((e) => console.log(e));
        const access_token = responseLogin.body.access_token;
        UserId = responseLogin.body.id;


        /* Je récupère le panier de mon utilisateur */
        responsePaniersofUsers = await request(app).get(`/paniers/${UserId}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');

        /* Pour mon premier burger, j'ajoute dans mon panier une quantité  */
        addburger_panier.PanierId = responsePaniersofUsers.body.panierId;
        addburger_panier.BurgerId = responsePaniersofUsers.body.panier[0].BurgerId;
        responsePutAddBurger = await request(app).put('/paniers/burger/add').set('Content-Type', 'application/json').set('Authorization', `Bearer ${access_token}`).send(addburger_panier).catch((e) => console.log(e))


        /* Pour mon deuxième burger, j'enlève dans mon panier une quantité (il sera donc enlevée) */
        removeburger_panier.PanierId = responsePaniersofUsers.body.panierId;
        removeburger_panier.BurgerId = responsePaniersofUsers.body.panier[1].BurgerId;
        responsePutRemoveBurger = await request(app).put('/paniers/burger/remove').set('Content-Type', 'application/json').set('Authorization', `Bearer ${access_token}`).send(removeburger_panier).catch((e) => console.log(e))

        /* Je récupère le panier de mon utilisateur où maintenant on a plus que 1 burger  */
        responsePaniersUsers = await request(app).get(`/paniers/${UserId}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');


    });

    test('Crud Add/Remove Burger in Panier', () => {
        /* Je me connecte pour un token */
        expect(responseLogin.statusCode).toBe(200);


        /* Je récupère le panier de mon utilisateur */
        expect(responsePaniersofUsers.statusCode).toBe(200);
        expect(responsePaniersofUsers.body.panier.length).toStrictEqual(2);
        expect(responsePaniersofUsers.body.total > 0).toBe(true);


        /* Pour mon premier burger, j'ajoute dans mon panier une quantité  */
        expect(responsePutAddBurger.statusCode).toBe(200);
        /* Pour mon deuxième burger, j'enlève dans mon panier une quantité (il sera donc enlevée) */
        expect(responsePutRemoveBurger.statusCode).toBe(200);


        /* Je récupère le panier de mon utilisateur où maintenant on a plus que 1 burger  */
        expect(responsePaniersUsers.statusCode).toBe(200);
        expect(responsePaniersUsers.body.panier.length).toStrictEqual(1);
        expect(responsePaniersUsers.body.total > 0).toBe(true);
    });

})

describe('Delete Paniers', () => {

    const account = {
        "username": "user",
        "password": "user"
    };
    
    beforeEach(async () => {

        /* Je me connecte pour un token */
        responseLogin = await request(app).post('/users/login').set('Content-Type', 'application/json').send(account).catch((e) => console.log(e));
        const access_token = responseLogin.body.access_token;
        UserId = responseLogin.body.id;


        /* Je récupère le panier de mon utilisateur */
        responsePaniersofUsers = await request(app).get(`/paniers/${UserId}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');


        /* Je supprime mon panier  */
        responsePaniersDeleted = await request(app).delete(`/paniers/${UserId}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');


        /* J'obtiens le panier de mon utilisateur supprimer mais le serveur regenere un panier  */
        responsePaniersUsersIDDeleted = await request(app).get(`/paniers/${UserId}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');
   

    });

    test('Delete Panier', () => {
        /* Je me connecte pour un token */
        expect(responseLogin.statusCode).toBe(200);


        /* Je récupère le panier de mon utilisateur */
        expect(responsePaniersofUsers.statusCode).toBe(200);
        expect(responsePaniersofUsers.body.panier.length).toStrictEqual(1);
        expect(responsePaniersofUsers.body.total > 0).toBe(true);


        /* Je supprime mon panier  */
        expect(responsePaniersDeleted.statusCode).toBe(200);

        /* J'obtiens le panier de mon utilisateur supprimer mais le serveur regenere un panier  */
        expect(responsePaniersUsersIDDeleted.statusCode).toBe(200);
    });

})




