const Order = require('../models/order.model');
const auth = require('../util/jwt.util');

// Create and Save a new Order
exports.create = (req, res) => {

    //validate authorization token
    var token = req.headers['x-auth-token'];
    if (!token || (token!== auth.xAuthToken)) return res.status(401).send({ auth: false, message: 'No token provided.' });
   
    // Validate request
    if(!req.body) {
        console.log(req);
        return res.status(400).send({
            message: "Order content can not be empty"
        });
    }

    // Create a Order
    const order = new Order(req.body);
    order.orderStatus = 'pending';
    //
  
    if( order.orderItems.length === 0){
        return res.status(400).send({
            message: "Please add items to the order"
        });
    }
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

// Retrieve and return all pending orders from the database.
exports.findAll = (req, res) => {
    //validate authorization token
    var token = req.headers['x-auth-token'];
    if (!token || (token!==auth.xAuthToken)) return res.status(401).send({ auth: false, message: 'No token provided.' }); 
    Order.find({orderStatus:'pending'},null,{sort:{createdAt:-1}})
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

      //validate authorization token
    var token = req.headers['x-auth-token'];
    if (!token || (token!==auth.xAuthToken)) return res.status(401).send({ auth: false, message: 'No token provided.' });
   
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Order content can not be empty bitch"
        });
    }
    let order = req.body;
    if(order.orderItems.length === 0){
        order.orderStatus = 'cancelled';
    }
    // Find order and update it with the request body
    Order.findOneAndUpdate({_id:req.params.orderId},order, {new: true})
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

