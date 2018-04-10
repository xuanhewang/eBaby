const mongoose = require('mongoose');

const matronSchema = mongoose.Schema({
    username: String,
    password: String,
    token: String,
    create_time: Date,

});

const motronModel = {
    motron: mongoose.model('admin', matronSchema)
};

module.exports = motronModel;