const User = require('../config/db').userModel;// 引入user的表结构

const findAllUser = ()=>{
	return new Promise((resolve, reject) => {
		User.find({}, (err, doc) => {
			if (err) {
				reject(err);
			}
			resolve(doc);
		});
	});
};

module.exports = {
	findAllUser
};
