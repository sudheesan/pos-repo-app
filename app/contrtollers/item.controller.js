const Item = require('../models/item.model');

// Retrieve and return all items from the database.
exports.findAll = (req, res) => {
    Item.find()
    .then(items => {
        res.send(items);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
};

