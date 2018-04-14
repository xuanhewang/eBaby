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

const findAdminById = (id) => {
    return new Promise((resolve, reject) => {
        admin.findOne({ _id: id }, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};

const findAllAdmin = (pageNum, pageSize)=>{
    return new Promise((resolve, reject) => {
        admin.find({}, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        }).skip(pageNum * pageSize).limit(pageSize);
    });
};

const delAdmin = function(id){
    return new Promise(( resolve, reject) => {
        admin.findOneAndRemove({ _id: id }, err => {
            if(err){
                reject(err);
            }
            console.log('删除用户成功');
            resolve(reject);
        });
    });
};

module.exports = {
    admin,
    findAllAdmin,
    findAdmin,
    delAdmin,
    findAdminById
};
