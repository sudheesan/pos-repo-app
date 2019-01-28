const Order = require('../models/order.model');

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        console.log(req);
        return res.status(400).send({
            message: "Order content can not be empty"
        });
    }

    // Create a Order
    const order = new Order(req.body);
    order.orderNumber = order._id;
    order.orderStatus = 'pending';
    // Save order in the database
    order.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order."
        });
    });
};

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
    Order.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
};


// Update a order identified by the orderId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Order content can not be empty"
        });
    }

    // Find order and update it with the request body
    Order.findOneAndUpdate({orderNumber:req.params.orderId}, req.body, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Error updating order with id " + req.params.orderId
        });
    });
};

