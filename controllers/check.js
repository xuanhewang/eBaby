/**
 * Created by wang on 17/12/23.
 */
// const ObjectId = require('mongodb').ObjectId;
const check = require('../models/check');

const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../middleware/createToken.js');

const submitCheck = async (ctx, next) => {
    let username = ctx.request.headers.username
    let name = ctx.request.body.name
    let imageUrlCheck = ctx.request.body.imageUrlCheck
    let create_time = new Date()
    let hadSubmit = await check.check.find({username: username})
    console.log(hadSubmit)
    if (hadSubmit.length > 0){
        ctx.body = {
            success: false,
            msg: '您已经提交过申请，请勿重复提交'
        }
    } else {
        let doc = await check.submitCheck(username, name, imageUrlCheck, create_time)
        console.log(doc)
        ctx.body = {
            success: true,
            msg: '提交申请成功'
        }
    }

}

const confirmCheck = async (ctx, next) => {
    let id = ctx.request.body._id
    let isChecked = parseInt(ctx.request.body.isChecked)
    let checker = ctx.request.headers.username
    let check_time = new Date()
    let doc = await check.check.findOneAndUpdate({_id: id}, {
        isChecked: isChecked,
        checker: checker,
        check_time: check_time
    })
    ctx.body = {
        success: true,
        msg: '审批成功'
    }
}

const allConfirmCheck = async (ctx, next) => {
    let doc = await check.check.find({})
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

const matronSubmitCheck = async (ctx, next) => {
    let username = ctx.request.headers.username
    let doc = await check.check.find({username: username})
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
    submitCheck,
    confirmCheck,
    matronSubmitCheck,
    allConfirmCheck
};
