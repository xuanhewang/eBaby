/**
 * Created by wang on 17/12/23.
 */
const user = require('../models/user');

const findAllUser = async (ctx, next) => {
	let allUsers = await user.findAllUser();
	console.log(allUsers)
	ctx.body = allUsers
};

module.exports = {
	findAllUser
};
