const order = require('../config/db').orderModel;// 引入user的表结构
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../middleware/createToken.js');

//根据用户名查找用户
const userOrder = (user, matron, money, user_address, step, create_time, user_msg) => {
    let createorder = new order({
        user: user,
        matron: matron,
        money: money,
        user_address: user_address,
        step: step,
        create_time: create_time,
        user_msg: user_msg
    })
    return createorder.save()
}

const findAllMatronOrder = (username) => {
    return order.find({matron: username})
};

const findNewMatronOrder = (matron) => {
    return order.find({matron: matron, finished: false})
};

const findAllAdmin = (pageNum, pageSize) => {
    return new Promise((resolve, reject) => {
        admin.find({}, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        }).skip(pageNum * pageSize).limit(pageSize);
    });
};

const delAdmin = function (id) {
    return new Promise((resolve, reject) => {
        admin.findOneAndRemove({_id: id}, err => {
            if (err) {
                reject(err);
            }
            console.log('删除用户成功');
            resolve(reject);
        });
    });
};

module.exports = {
    order,
    userOrder,
    findAllMatronOrder,
    findNewMatronOrder
};
