const mongoose = require('mongoose');

const checkSchema = mongoose.Schema({
    username: String,
    name: String,
    isChecked: {
        type: Boolean,
        default: false
    },
    imageUrlCheck: String,
    create_time: {
        type: Date,
        default: new Date()
    },
    checker: {
        type: String,
        default: 'admin'
    },
    check_time: {
        type: Date,
        default: new Date()
    }
});

const checkModel = {
    check: mongoose.model('check', checkSchema)
};

module.exports = checkModel;