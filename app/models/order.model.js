const mongoose = require('mongoose');
const Item = require('./item.model');

const orderitem = mongoose.Schema({
    item : Item.schema,
    itemQuantity : Number
});

const OrderSchema = mongoose.Schema({
    orderNumber: String,
    orderStatus: String,
    totalAmount:Number,
    orderItems: [orderitem]
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
