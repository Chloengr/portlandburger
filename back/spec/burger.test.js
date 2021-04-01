const request = require('supertest');
const { response } = require('../app');
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')
require('./factories/burger').factory
const factory = require('factory-girl').factory



/* Permet de se connecter */
const account = {
    "username": "admin",
    "password": "admin"
};

/* Permet de créer un burger */
const burger = {
    "title": "BurgerMomo",
    "description": "c bon",
    "price": 200.99
};

/* Permet de modifier un burger */
const burger_update = {
    "title": "titre mod",
    "description": "c bon",
    "price": 200.99
};

/* Permet de récupérer le token de la connexion */
let access_token = null;

/* Permet de récupérer le burger de la requête POST */
let burger_post = null;

beforeAll(async() => {
    await cleanDb(db, 'burger');
    burgers = await factory.createMany('Burgers', 20)
    responseLogin= await request(app).post('/users/login').set('Content-Type', 'application/json').send(account).catch((e) => console.log(e));
    access_token = responseLogin.body.access_token;
});

afterAll(async() => {
    //await cleanDb(db)
    // await db.close()
});

describe('get burgers', () => {
    
    beforeEach(async() => {
        responseBurgers = await request(app).get('/burgers').set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');
    })

    test('Burger CRUD Response', async() => {
        expect(responseBurgers.statusCode).toBe(200);

        expect(responseBurgers.body.length).toBe(20);
    });
});

describe('post burgers', () => {
    
    beforeEach(async() => {
        responsePostBurger = await request(app).post('/burgers/').set('Authorization', `Bearer ${access_token}`).set('Content-Type', 'application/json').send(burger).catch((e) => console.log(e));  
        burger_post = await db.Burger.findOne({ where: {id: responsePostBurger.body.id}});

    })

    test('Burger CRUD Post Response', async() => {
        expect(responsePostBurger.statusCode).toBe(200);

        expect(burger_post.title).toBe(burger.title);
        
    });
});

describe('put burgers', () => {
    
    beforeEach(async() => {
        responsePutBurger = await request(app).put(`/burgers/${burger_post.id}`).set('Authorization', `Bearer ${access_token}`).set('Content-Type', 'application/json').send(burger_update).catch((e) => console.log(e));
    })

    test('Burger CRUD Response', async() => {

        expect(responsePutBurger.statusCode).toBe(200);

        expect(responsePutBurger.body.title).toBe(burger_update.title);

        expect(responsePutBurger.body.title === burger_post.title).toBe(false);

        expect(responsePutBurger.body.price === burger_post.price).toBe(true);

    });
});

describe('delete burgers', () => {
    
    beforeEach(async() => {
        responseDeleteBurgers = await request(app).delete(`/burgers/${burger_post.id}`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');
        burgerDelete = await db.Burger.findOne({ where: {id: burger_post.id}});
    })

    test('Burger CRUD Response', async() => {
        expect(responseDeleteBurgers.statusCode).toBe(200);

        expect(burgerDelete === null).toBe(true);
    });
});