const mongoose = require('mongoose');

const checkSchema = mongoose.Schema({
    username: String,
    name: String,
    isChecked: {
        type: Number,
        default: 0
    },
    imageUrlCheck: String,
    create_time: {
        type: Date,
        default: new Date()
    },
    checker: {
        type: String
    },
    check_time: Date
});

const checkModel = {
    check: mongoose.model('check', checkSchema)
};

module.exports = checkModel;