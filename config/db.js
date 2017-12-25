const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/eBaby');

let db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', () => {
	console.log('连接数据库失败')
});

db.on('open', () => {
	console.log('连接数据库成功')
});

const userSchema = mongoose.Schema({
	username: String,
	password: String,
	level: Number,
	age: Number,
	workingLife: Number,
	token: String,
	createTime: Date
});

const model = {
	user: mongoose.model('user', userSchema)
};

module.exports = model;

