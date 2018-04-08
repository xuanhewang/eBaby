const mongoose = require('mongoose');
const userModel = require('../schema/user')
const adminModel = require('../schema/admin')
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
};



