const Item = require('../models/item.model');

// Create and Save a new Item
exports.create = (req, res) => {
    // Validate request
    console.log(req.body)
    if(!req.body) {
        return res.status(400).send({
            message: "Item content can not be empty"
        });
    }

    // Create a Item
    const item = new Item(req.body);
    item.itemCode = item._id;
    // Save order in the database
    item.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the item."
        });
    });
};

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

