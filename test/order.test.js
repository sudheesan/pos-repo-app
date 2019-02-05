const app = require('../server'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    auth = require('../app/util/jwt.util'),
    dbConfig = require('../config/database.config');
const order = {
    totalAmount: 900,
    orderItems: [

        {
            item: {
                _id: "5c458754251959279878ab79",
                itemName: "Pizza",
                stockQuantity: 10,
                unitPrice: 450,
                itemCode: "5c458754251959279878ab79"
            },
            itemQuantity: 2
        }

    ]
}

const updateOrder = {

    _id: "5c5059789549741527c6e925",
    orderItems: [
        {
            _id: "5c5059789549741527c6e926",
            item: {
                _id: "5c458754251959279878ab79",
                itemName: "Pizza",
                stockQuantity: 10,
                unitPrice: 450,
                itemCode: "5c458754251959279878ab79",

            },
            itemQuantity: 10
        }
    ],
    totalAmount: 4500,
    orderStatus: "pending",
    orderNumber: 5,

}

const cancelOrder = {

    _id: "5c59640895ced342b0a45270",
    totalAmount: 0,
    orderItems: [
    ],
    orderStatus: "pending",
    orderNumber: 82,

}

let responceData = {

}

let errorData = {

}
let authToken = '';
describe('Point of sale system API Integration Tests', function () {

    afterAll(() => {
        mongoose.disconnect();
    });

    beforeAll((done) => {
        mongoose.connect(dbConfig.testUrl)
        request(app)
            .post("/login").send({ userName: 'admin', password: 'admin' })
            .end((err, response) => {
                authToken = response.body.auth.authToken;
                done();
            });
    });

    describe("routes: index", () => {

        test("should respond", async () => {
            const response = await request(app).get("/");
            expect(response.status).toEqual(200);
        });

    });

    describe("# GET all pendingOrders", () => {
        test("Should return all pending tasks", async () => {
            const response = await request(app).get("/orders").set('x-auth-token', authToken);
            expect(response.type).toEqual('application/json');
            expect(response.body).toBeInstanceOf(Array);
            responceData.singleOrder = response.body[0];
            expect(responceData.singleOrder).toEqual(expect.objectContaining({
                _id: expect.any(String),
                orderItems: expect.any(Array),
                totalAmount: expect.any(Number),
                orderStatus: expect.any(String),
                orderNumber: expect.any(Number),
            }));

        });
    });

    describe('POST /order', function () {
        test('new order id has to be created', async () => {
            const response = await request(app).post("/orders").send(order).set('x-auth-token', authToken);
            expect(response.status).toEqual(200);
            expect(response.type).toEqual('application/json');
            responceData.singleOrder = response.body;
            expect(responceData.singleOrder).toEqual(expect.objectContaining({
                _id: expect.any(String),
                orderItems: expect.any(Array),
                totalAmount: expect.any(Number),
                orderNumber: expect.any(Number),
                orderStatus: expect.any(String)
            }));
        });
    });

    describe('PUT /order', function () {
        test('Th orders whichhave one or more should be updated according to the order _id', async () => {
            const response = await request(app).put("/orders/" + updateOrder._id).send(updateOrder).set('x-auth-token', authToken);
            expect(response.status).toEqual(200);
            expect(response.type).toEqual('application/json');
            responceData.singleOrder = response.body;
            expect(responceData.singleOrder._id).toEqual(updateOrder._id);
            expect(responceData.singleOrder).toEqual(expect.objectContaining({
                _id: expect.any(String),
                orderItems: expect.any(Array),
                totalAmount: expect.any(Number)
            }));

        });

        test('The orders which dont have one or more should be updated according to the order _id and status should be set to "cancelled"', async () => {
            const response = await request(app).put("/orders/" + cancelOrder._id).send(cancelOrder).set('x-auth-token', authToken);
            expect(response.status).toEqual(200);
            expect(response.type).toEqual('application/json');
            responceData.singleOrder = response.body;
            expect(responceData.singleOrder._id).toEqual(cancelOrder._id);
            expect(responceData.singleOrder.orderStatus).toEqual('cancelled');
        });

        test('sending a null oject or  a empty object as request body should return a bad request', async () => {

           const response = await request(app).put("/orders/" + updateOrder._id).send().set('x-auth-token', authToken);
           expect(response.status).toEqual(400);
           
        });


        test('sending a orderId that doesnt exist shout return a resource not found ', async () => {

            const response = await request(app).put("/orders/skdjald3").send(updateOrder).set('x-auth-token', authToken);
            expect(response.status).toEqual(404);
            
         });
    });

});