const mongoose = require('mongoose');


const ItemSchema = mongoose.Schema({
    itemCode: String,
    itemName: String,
    unitPrice: Number,
    stockQuantity: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', ItemSchema);