const article = require('../config/db').articleModel;// 引入user的表结构
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../middleware/createToken.js');

//根据用户名查找用户
const findArticle = (username) => {
    return new Promise((resolve, reject) => {
        Article.findOne({ username }, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};

const findArticleById = (id) => {
    return new Promise((resolve, reject) => {
        article.findOne({ _id: id }, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};

const findAllArticle = (pageNum, pageSize)=>{
    return new Promise((resolve, reject) => {
        article.find({}, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        }).skip(pageNum * pageSize).limit(pageSize);
    });
};

const delArticle = function(id){
    return new Promise(( resolve, reject) => {
        article.findOneAndRemove({ _id: id }, err => {
            if(err){
                reject(err);
            }
            console.log('删除用户成功');
            resolve(reject);
        });
    });
};

module.exports = {
    article,
    findAllArticle,
    findArticle,
    delArticle,
    findArticleById
};
