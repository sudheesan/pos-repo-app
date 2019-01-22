module.exports = (app) => {
    const items = require('../contrtollers/item.controller');

    // Create a new Item
    app.post('/items', items.create);

    // Retrieve all Item
    app.get('/items', items.findAll);
}