const mongoose = require('mongoose');
const  autoIncrement = require('mongoose-auto-increment');
const Item = require('./item.model');

const orderitem = mongoose.Schema({
    item : Item.schema,
    itemQuantity : Number
});

const OrderSchema = mongoose.Schema({
    orderStatus: String,
    totalAmount:Number,
    orderItems: [orderitem]
}, {
    timestamps: true
});

autoIncrement.initialize(mongoose.connection); 

OrderSchema.plugin(autoIncrement.plugin,{  model: 'Order',field: 'orderNumber',startAt: 1});

module.exports = mongoose.model('Order', OrderSchema);
