const admin = require('../config/db').adminModel;// 引入user的表结构
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../middleware/createToken.js');

//根据用户名查找用户
const findAdmin = (username) => {
    return new Promise((resolve, reject) => {
        admin.findOne({ username }, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};
const findAllAdmin = ()=>{
    return new Promise((resolve, reject) => {
        admin.find({}, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};

module.exports = {
    admin,
    findAllAdmin,
    findAdmin
};
