const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    token: String,
    create_time: Date
});

const userModel = {
    user: mongoose.model('user', userSchema)
};

module.exports = userModel.user;