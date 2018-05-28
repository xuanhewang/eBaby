const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: String,
    matron: String,
    step: Number,
    create_time: {
        type: Date,
        default: new Date()
    },
    back_time: Date,
    money: Number,
    user_address: String,
    user_msg: String,
    matron_msg: String,
    matron_status: {
        type: Boolean,
        default: false
    },
    finished: {
        type: Boolean,
        default: false
    },
    user_assess: String,
    user_assess_level: Number
});

const orderModel = {
    order: mongoose.model('order', orderSchema)
};

module.exports = orderModel;