const check = require('../config/db').checkModel;// 引入user的表结构
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../middleware/createToken.js');

//根据用户名查找用户
const submitCheck = (username, name, imageUrlCheck, create_time) => {
    return new check({
        username:username,
        name:name,
        imageUrlCheck:imageUrlCheck,
        create_time:create_time
    }).save()
}

module.exports = {
    check,
    submitCheck
};
