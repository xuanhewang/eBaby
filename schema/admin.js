const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: String,
    password: String,
    isSuper: Boolean,
    token: String,
    create_time: Date
});

const adminModel = {
    admin: mongoose.model('admin', adminSchema)
};

module.exports = adminModel;