const mongoose = require('mongoose');

const matronSchema = mongoose.Schema({
    username: String,
    password: String,
    token: String,
    create_time: Date,
    name: String,
    age: String,
    mobile: String,
    experience: String,
    price: String,
    specialty: String,
    sex: String,
    isworking: {
        type: String,
        default: '0'
    },
    hometown: String,
    personalinfo: String,
    imageurl: String
});

const matronModel = {
    matron: mongoose.model('matron', matronSchema)
};

module.exports = matronModel;