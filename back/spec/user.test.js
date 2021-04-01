
const request = require('supertest')
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')

beforeAll(async() => {
    await cleanDb(db);
    //await cleanDb(db)
});

afterAll(async() => {
    //await cleanDb(db)
    // await db.close()
});


describe('Register and Login', () => {

    const user = {
        "username": "user",
        "password": "user",
        "role":"USER"
    };

    const admin = {
        "username": "admin",
        "password": "admin",
        "role":"ADMIN"
    };

    beforeEach(async() => {
        responseUser = await request(app).post('/users/register').set('Content-Type', 'application/json').send(user).catch((e) => console.log(e));
        responseAdmin = await request(app).post('/users/register').set('Content-Type', 'application/json').send(admin).catch((e) => console.log(e));
    })

    test('Register Response', async() => {
        expect(responseUser.statusCode).toBe(200);
        expect(responseUser.body.role).toBe("USER");

        expect(responseAdmin.statusCode).toBe(200);
        expect(responseAdmin.body.role).toBe("ADMIN");
    });
});


describe('Login', () => {

    const user = {
        "username": "user",
        "password": "user"
    };

    beforeEach(async() => {
        responseLogin = await request(app).post('/users/login').set('Content-Type', 'application/json').send(user).catch((e) => console.log(e));
    })

    test('Login Response', async() => {
        expect(responseLogin.statusCode).toBe(200);
    });
});