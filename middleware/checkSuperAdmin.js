const admin = require('../models/admin');

module.exports = async (ctx, next) => {
    let username = ctx.request.headers.username
    let doc = await admin.findAdmin(username)
    if (doc && doc.isSuper){
        next()
    } else {
        ctx.body = {
            sucess: false,
            msg: '当前登录账号不是超级管理员'
        }
    }
};