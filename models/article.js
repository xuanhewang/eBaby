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
        Article.findOne({username}, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};

const findArticleById = (id) => {
    return new Promise((resolve, reject) => {
        article.findOne({_id: id}, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};

const findAllArticle = (pageNum, pageSize, artTitle, artCategory) => {
    if (artTitle) {
        if (artCategory) {
            return article.find({
                art_title: {$regex: artTitle},
                art_category: artCategory
            }).skip(pageNum * pageSize).limit(pageSize);
        } else {
            return article.find({art_title: {$regex: artTitle}}).skip(pageNum * pageSize).limit(pageSize);
        }
    } else {
        if (artCategory) {
            return article.find({art_category: artCategory}).skip(pageNum * pageSize).limit(pageSize);
        } else {
            return article.find({}).skip(pageNum * pageSize).limit(pageSize);
        }
    }

};

const updateArticle = (id, art_title, art_des, art_content, art_category) => {
    return article.findOneAndUpdate({_id: id}, {
        art_title: art_title, art_des: art_des, art_content: art_content, art_category: art_category
    })
}

const delArticle = function (id) {
    return article.findOneAndRemove({_id: id});
};

module.exports = {
    article,
    findAllArticle,
    updateArticle,
    findArticle,
    delArticle,
    findArticleById
};
