const mongoose = require('mongoose');
const userModel = require('../schema/user')
const adminModel = require('../schema/admin').admin
const matronModel = require('../schema/matron').matron
const articleModel = require('../schema/article').article
const orderModel = require('../schema/order').order
const checkModel = require('../schema/check').check
mongoose.connect('mongodb://106.15.92.48:27017/Baby');

const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', () => {
	console.log('连接数据库失败')
});

db.on('open', () => {
	console.log('连接数据库成功')
});


module.exports = {
	userModel,
    adminModel,
    matronModel,
    articleModel,
    orderModel,
    checkModel
};



