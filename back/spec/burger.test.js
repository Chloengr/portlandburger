const request = require('supertest');
const { response } = require('../app');
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')
require('./factories/burger').factory
const factory = require('factory-girl').factory




beforeAll(async() => {
    //await cleanDb(db)
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

    beforeEach(async() => {
        burgers = await factory.createMany('Burgers', 20)

        responsePost = await request(app).post('/users/login').set('Content-Type', 'application/json').send(account).catch((e) => console.log(e));
        const access_token = responsePost.body.access_token;
        responseBurgers = await request(app).get('/burgers').set('Authorization', `Bearer ${responseLogin.body.token}`).set('Accept', 'application/json');

    })

    test('Register Response', async() => {
        expect(responsePost.statusCode).toBe(200);

        expect(responseBurgers.statusCode).toBe(200);
    });
});