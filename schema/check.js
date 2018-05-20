const mongoose = require('mongoose');

const checkSchema = mongoose.Schema({
    username: String,
    create_time: {
        type: Date,
        default: new Date()
    },
    name: String,
    isChecked: {
        type: Boolean,
        default: false
    },
    imageUrlCheck: String
});

const checkModel = {
    check: mongoose.model('check', checkSchema)
};

module.exports = checkModel;