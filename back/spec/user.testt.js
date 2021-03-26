/*
const request = require('supertest')
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')

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
        responsePost = await request(app).post('/users/login').set('Content-Type', 'application/vnd.api+json').send(account).catch((e) => console.log(e));
    })

    test('Register Response', async() => {
        expect(responsePost.statusCode).toBe(200);
        expect(responsePost.body.username).toBe(account.data.attributes.email);
        expect(responsePost.body.password == account.data.attributes.password).toBe(false); //Car crypté
    });
});
*/