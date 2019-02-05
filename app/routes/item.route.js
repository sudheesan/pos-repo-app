module.exports = (app) => {
    const items = require('../contrtollers/item.controller');


    // Retrieve all Item
    app.get('/items', items.findAll);
}