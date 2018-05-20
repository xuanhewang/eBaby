/**
 * Created by wang on 17/12/23.
 */
// const ObjectId = require('mongodb').ObjectId;
const admin = require('../models/admin');
const matron = require('../models/matron');
const user = require('../models/user');
const article = require('../models/article');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../middleware/createToken.js');

const count = async (ctx, next) => {
    let adminCount = await admin.admin.count()
    let matronCount = await matron.matron.count()
    let userCount = await user.user.count()
    let articleCount = await article.article.count()
    ctx.body = {
        success: true,
        data: {
            adminCount: adminCount,
            matronCount: matronCount,
            userCount: userCount,
            articleCount: articleCount
        }
    }
};

const matronCity = async (ctx, next) => {
    let cities = await matron.matron.find({}, {hometown: 1, _id: 0})
    let setCities = []
    for (let i in cities){
        setCities.push(cities[i].hometown)
    }
    let res = []
    setCities.sort()
    for (let i = 0; i < setCities.length;) {
        let count = 0;
        for (let j = i; j < setCities.length; j++) {
            if (setCities[i] === setCities[j]) {
                count++;
            }
        }
        res.push({
            city: setCities[i],
            count: count
        })
        i+=count;
    }

    ctx.body = {
        success: true,
        data: {
            cities: res
        }
    }
}

const matronAge = async (ctx, next) => {
    let age = await matron.matron.find({}, {age: 1, _id: 0})
    let setAge = []
    for (let i in age){
        setAge.push(age[i].age)
    }
    let res = []
    setAge.sort()
    for (let i = 0; i < setAge.length;) {
        let count = 0;
        for (let j = i; j < setAge.length; j++) {
            if (setAge[i] === setAge[j]) {
                count++;
            }
        }
        res.push({
            age: setAge[i],
            count: count
        })
        i+=count;
    }

    ctx.body = {
        success: true,
        data: {
            matronAge: res
        }
    }
}

const expChart = async (ctx, next) => {
    // let id = ObjectId(ctx.request.body.id)
    let doc = await matron.matron.find({}).sort({experience: -1}).limit(20)
    ctx.body = {
        success: true,
        data: doc
    }

}

const artTop = async (ctx, next) => {
    let doc = await article.article.find({}).sort({art_create_time: -1}).limit(10)
    ctx.body = {
        success: true,
        data: doc
    }
}

module.exports = {
    count,
    matronCity,
    matronAge,
    expChart,
    artTop
};
