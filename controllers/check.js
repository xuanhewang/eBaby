/**
 * Created by wang on 17/12/23.
 */
// const ObjectId = require('mongodb').ObjectId;
const order = require('../models/order');

const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../middleware/createToken.js');

const userOrder = async (ctx, next) => {
    let user = ctx.request.headers.username
    let matron = ctx.request.body.matron
    let money = ctx.request.body.money
    let user_address = ctx.request.body.user_address
    let step = 1
    let create_time = new Date()
    let user_msg = ctx.request.body.userMsg
    ctx.body = {
        success: true,
        msg: '预定成功，等待月嫂回应'
    }
    let doc = await order.userOrder(user, matron, money, user_address, step, create_time, user_msg)
}

const findAllMatronOrder = async (ctx, next) => {
    let matron = ctx.request.headers.username
    let doc = await order.findAllMatronOrder(matron)
    if (doc) {
        ctx.body = {
            success: true,
            data: doc
        }
    } else {
        ctx.body = {
            success: false,
            msg: '查询失败'
        }
    }
}

const findNewMatronOrder = async (ctx, next) => {
    let matron = ctx.request.headers.username
    let doc = await order.findNewMatronOrder(matron)
    if (doc) {
        ctx.body = {
            success: true,
            data: doc
        }
    } else {
        ctx.body = {
            success: false,
            msg: '查询失败'
        }
    }
}

module.exports = {
    userOrder,
    findNewMatronOrder,
    findAllMatronOrder
};
