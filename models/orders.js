const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence') (mongoose);


const orderSchema = new mongoose.Schema({
    id: {type: Number},
    phoneNumber: {type: String},
    email: {type: String},
    linkedId: {type: Number},
    linkPrecedence: {type: String, enum: ['primary', 'secondary'], default: 'primary'},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deletedAt: {type: Date}
});

orderSchema.plugin(mongooseSequence, { inc_field: 'id'});

const order = mongoose.model('order', orderSchema);

module.exports = order;