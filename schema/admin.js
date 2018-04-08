const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: String,
    password: String,
    isSuper: Boolean,
    token: String,
    createTime: Date,
    updateTime: Date
});

const adminModel = {
    user: mongoose.model('admin', adminSchema)
};

module.exports = adminModel;