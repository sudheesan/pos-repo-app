module.exports = (app) => {
    const orders = require('../contrtollers/order.contrtoller');

    // Create a new Order
    app.post('/orders', orders.create);

    // Retrieve all Order
    app.get('/orders', orders.findAll);

    // Update a Order with orderId
    app.put('/orders/:orderId', orders.update);
}