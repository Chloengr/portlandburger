const request = require('supertest');
const { response } = require('../app');
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')






beforeAll(async() => {
    await cleanDb(db)
});

afterAll(async() => {
    //await cleanDb(db)
    // await db.close()
});


describe('get paniers', () => {
    const daterd = new Date()
    const account = {
        "username": "user",
        "password": "user"
    };
    const panier = {
       "date": daterd
    };
    
    beforeEach(async() => {
        //paniers = await factory.createMany('Burgers', 20)

        responsePost = await request(app).post('/users/login').set('Content-Type', 'application/json').send(account).catch((e) => console.log(e));
        const access_token = responsePost.body.access_token;
        responsePaniers = await request(app).get('/paniers/').set('Authorization', `Bearer ${access_token}`).set('Accept', 'application/json');


        
    })

    test('Burger CRUD Response', async() => {
        expect(responsePost.statusCode).toBe(200);
        expect(responsePaniers.statusCode).toBe(200);

        
    });
});