const request = require('supertest');
const { response } = require('../app');
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')
require('./factories/burger').factory
const factory = require('factory-girl').factory





beforeAll(async() => {
    await cleanDb(db)
});

afterAll(async() => {
    //await cleanDb(db)
    // await db.close()
});

describe('get burgers', () => {

    const account = {
        "username": "user",
        "password": "user"
    };
    const burger = {
        "title": "BurgerMomo",
        "description": "c bon",
        "price": 200.99,
        "image": "beau burger"
    }
    const burger2 = {
        "title": "titre mod",
        "description": "c bon",
        "price": 200.99,
        "image": "beau burger"
    }
    
    beforeEach(async() => {
        burgers = await factory.createMany('Burgers', 20)
        

        responsePost = await request(app).post('/users/login').set('Content-Type', 'application/json').send(account).catch((e) => console.log(e));
        const access_token = responsePost.body.access_token;
        responseBurgers = await request(app).get('/burgers').set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');
        responsePostBurger = await request(app).post('/burgers/').set('Content-Type', 'application/json').send(burger).catch((e) => console.log(e));  
        burgerPost = await db.Burger.findOne({ where: {id: responsePostBurger.body.id}});

        //burgerUpdate = await db.Burger.findOne({ where: {id: responsePostBurger.body.id}});
        //burgerUpdate.title = "titre modifié";
        
        responsePutBurger = await request(app).put(`/burgers/${burgerPost.id}`).set('Content-Type', 'application/json').send(burger2).catch((e) => console.log(e));

        responseDeleteBurgers = await request(app).delete(`/burgers/${burgerPost.id}`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');

        burgerDelete = await db.Burger.findOne({ where: {id: burgerPost.id}});
    })

    test('Burger CRUD Response', async() => {
        expect(responsePost.statusCode).toBe(200);

        expect(responseBurgers.statusCode).toBe(200);

        expect(responseBurgers.body.length).toBe(20);

        expect(responsePostBurger.statusCode).toBe(200);

        expect(burgerPost.title).toBe(burger.title);

        expect(responsePutBurger.statusCode).toBe(200);

        expect(responsePutBurger.body.title).toBe(burger2.title);

        expect(responsePutBurger.body.title === burgerPost.title).toBe(false);

        //expect(responsePutBurger.body.description === burgerPost.description).toBe(true);

        expect(responsePutBurger.body.price === burgerPost.price).toBe(true);

        expect(responseDeleteBurgers.statusCode).toBe(200);

        expect(burgerDelete === null ).toBe(true);

        
    });
});