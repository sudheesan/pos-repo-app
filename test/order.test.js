const app = require('../server'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    auth = require('../app/util/jwt.util'),
    dbConfig = require('../config/database.config');

describe('Point of sale system API Integration Tests', function() {

    afterAll(() => {
        mongoose.disconnect(dbConfig.url);
    });

    beforeAll(()=>{
        mongoose.connect(dbConfig.url)
    });

    describe("routes: index", () => {

        test("should respond as expected", async () => {
            const response = await request(app).get("/");
            expect(response.status).toEqual(200);
        });

    });

    describe("# GET all pendingOrders", () => {
        test("Should return all pending tasks", async () => {
            const response = await request(app).get("/orders").set('x-auth-token',auth.xAuthToken);
            expect(response.type).toEqual('application/json');
            expect(Array.isArray(response.body)).toBe(true);
        });
    });
    
});