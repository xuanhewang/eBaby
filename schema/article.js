const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    art_title: String,
    art_des: String,
    art_title_img: {
        type: String,
        default: 'title_img.jpg'
    },
    art_content: String,
    art_creator: {
        type: String,
        default: 'admin'
    },
    art_category: String,
    art_create_time: {
        type: String,
        default: new Date()
    },
    art_update_time: Date,
});

const articleModel = {
    article: mongoose.model('article', articleSchema)
};

module.exports = articleModel;