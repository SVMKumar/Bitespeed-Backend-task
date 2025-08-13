const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence');


const orderSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    phoneNumber: {type: String},
    email: {type: String},
    linkedIn: {type: Number},
    linkPrecedence: {type: Number, enum: ['primary', 'secondary'], default: 'primary',required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deletedAt: {type: Date}
});

orderSchema.plugin(mongooseSequence, { inc_field: 'id'});

const order = mongoose.model('order', orderSchema);

module.exports = order;