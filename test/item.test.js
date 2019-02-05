const app = require('../server'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    dbConfig = require('../config/database.config');

let responceData = {

}

describe('Point of sale system API Integration Tests', function () {

    afterAll(() => {
        mongoose.disconnect();
    });

    beforeAll(() => {
        mongoose.connect(dbConfig.testUrl)
    });


    describe("# GET all existing items", () => {
        test("Should return all items", async () => {
            const response = await request(app).get("/items");
            expect(response.type).toEqual('application/json');
            expect(response.body).toBeInstanceOf(Array);
            responceData.signleItem = response.body[0];
            expect(responceData.signleItem).toEqual(expect.objectContaining({
                _id: expect.any(String),
                itemCode: expect.any(String),
                itemName: expect.any(String),
                unitPrice: expect.any(Number),
            }));

        });
    });


});