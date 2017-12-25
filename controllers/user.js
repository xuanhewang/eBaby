/**
 * Created by wang on 17/12/23.
 */
const User = require('../config/db');

const findAllUser = () => {
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
