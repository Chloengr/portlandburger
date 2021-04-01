
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

describe('Register', () => {

    const account = {
        "username": "register",
        "password": "register"
    };

    beforeEach(async() => {
        responsePost = await request(app).post('/users/register').set('Content-Type', 'application/json').send(account).catch((e) => console.log(e));
    })

    test('Register Response', async() => {
        expect(responsePost.statusCode).toBe(200);
        expect(responsePost.body.role).toBe('USER');
    });
});
