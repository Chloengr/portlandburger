const request = require('supertest');
const { response } = require('../app');
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')
require('./factories/burger').factory
const factory = require('factory-girl').factory


beforeAll(async() => {
    await cleanDb(db);
});

afterAll(async() => {
    //await cleanDb(db)
    // await db.close()
});

function getRandomArbitrary(max) {
    return Math.floor(Math.random() * max);
  }

describe('get paniers', () => {

    const account = {
        "username": "user",
        "password": "user"
    };
    const panier = {
       "UserId": 1, 
    };

const burger1 = {
    "UserId": 1,
    "BurgerId": 1,
    "qte": 3
}
const burger2 = {
    "UserId": 1,
    "BurgerId": 1
} 

    beforeEach(async() => {
        paniers = await factory.createMany('Burgers', 20)

        responsePost = await request(app).post('/users/login').set('Content-Type', 'application/json').send(account).catch((e) => console.log(e));
        const access_token = responsePost.body.access_token;
        panier.UserId = responsePost.body.id;
        burger1.UserId = responsePost.body.id;
        burger2.UserId = responsePost.body.id;

        responsePaniers = await request(app).get('/paniers/').set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');
        responsePostPanier = await request(app).post('/paniers/').set('Content-Type', 'application/json').set('Authorization', `Bearer ${access_token}`).send(panier).catch((e) => console.log(e))
        responsePaniersUsersID = await request(app).get(`/paniers/${panier.UserId}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');
        responseBurgers = await request(app).get('/burgers').set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');
        burgers = responseBurgers.body;
        burger1.BurgerId = burgers[getRandomArbitrary(burgers.length)].id
        burger2.BurgerId = burgers[getRandomArbitrary(burgers.length)].id
        responsePostBurger1Panier = await request(app).post('/paniers/burger').set('Content-Type', 'application/json').set('Authorization', `Bearer ${access_token}`).send(burger1).catch((e) => console.log(e))
        responsePostBurger2Panier = await request(app).post('/paniers/burger').set('Content-Type', 'application/json').set('Authorization', `Bearer ${access_token}`).send(burger2).catch((e) => console.log(e))
        responsePaniersUsersFull = await request(app).get(`/paniers/${panier.UserId}/`).set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');
    })

    test('Burger CRUD Response', async() => {
        expect(responsePost.statusCode).toBe(200);

        expect(responsePaniers.statusCode).toBe(200);

        expect(responsePostPanier.statusCode).toBe(200);

        expect(responsePaniersUsersID.statusCode).toBe(200);

        expect(responsePaniersUsersID.body.panier).toStrictEqual([]);
        expect(responsePaniersUsersID.body.total).toBe(0);

        //expect(burger1).toBe(burger2);
        expect(responseBurgers.statusCode).toBe(200);

        expect(responsePostBurger1Panier.statusCode).toBe(200);
        expect(responsePostBurger2Panier.statusCode).toBe(200);

        expect(responsePaniersUsersFull.statusCode).toBe(200);
        expect(responsePaniersUsersFull.body.panier.length).toStrictEqual(2);
        expect(responsePaniersUsersFull.body.total > 0).toBe(true);


        
    });
});