/**
 * Created by wang on 17/12/23.
 */
// const ObjectId = require('mongodb').ObjectId;
const admin = require('../models/admin');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../middleware/createToken.js');

const findAllAdmin = async (ctx, next) => {
    let count = await admin.admin.count()
    let pageNum = parseInt(ctx.request.body.pageNum) - 1
    let pageSize = parseInt(ctx.request.body.pageSize)
    let allAdmin = await admin.findAllAdmin(pageNum, pageSize);
    ctx.body = {
        success: true,
        data: {
            count: count,
            data: allAdmin
        }
    }
};

const delAdmin = async (ctx, next) => {
    // let id = ObjectId(ctx.request.body.id)
    let id = ctx.request.body.id
    let adminInfo = await admin.findAdminById(id)
    if (adminInfo.isSuper) {
        ctx.status = 200
        ctx.body = {
            success: false,
            msg: '超级管理员无法删除'
        }
    } else {
        try {
            for (let i in id) {
                await admin.delAdmin(id[i])
            }
            ctx.body = {
                success: true,
                msg: '删除成功'
            }
        } catch (err) {
            ctx.body = {
                success: false,
                msg: '删除失败'
            }
        }
    }
}

const findAdmin = async (ctx, next) => {
    let username = ctx.request.body.username
    try{
        let doc = await admin.findAdmin(username)
        ctx.status = 200
        ctx.body = {
            msg: 'success',
            success: true,
            data: doc
        }
    } catch (err) {
        ctx.status = 200
        ctx.body = {
            msg: 'failed',
            success: false,
            data: []
        }
    }
}

const Login = async (ctx) => {
    //拿到账号和密码
    let username = ctx.request.body.username;
    let password = sha1(ctx.request.body.password);
    let doc = await admin.findAdmin(username);
    if (!doc) {
        console.log('检查到用户名不存在');
        ctx.status = 200;
        ctx.body = {
            info: false
        }
    } else if (doc.password === password) {
        console.log('密码一致!');
        //生成一个新的token,并存到数据库
        let token = createToken(username);
        console.log(token);
        doc.token = token;
        await new Promise((resolve, reject) => {
            doc.save((err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        ctx.status = 200;
        ctx.body = {
            success: true,
            username,
            token, //登录成功要创建一个新的token,应该存入数据库
        };
    } else {
        console.log('密码错误!');
        ctx.status = 200;
        ctx.body = {
            msg: '密码错误',
            success: false
        };
    }
};

//注册
const Reg = async (ctx) => {
    let adminName = ctx.request.headers.username
    let adminNow = await admin.findAdmin(adminName)
    if (adminNow.isSuper) {
        let user = new admin.admin({
            username: ctx.request.body.username,
            password: sha1(ctx.request.body.password), //加密
            token: createToken(this.username), //创建token并存入数据库
            isSuper: ctx.request.body.isSuper
        });
        console.log(user)
        //将objectid转换为用户创建时间(可以不用)
        user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');

        let doc = await admin.findAdmin(user.username);
        if (doc) {
            console.log('用户名已经存在');
            ctx.status = 200;
            ctx.body = {
                status: 200,
                success: false
            };
        } else {
            await new Promise((resolve, reject) => {
                user.save((err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
            console.log('注册成功');
            ctx.status = 200;
            ctx.body = {
                status: 200,
                success: true
            }
        }
    } else {
        ctx.status = 200;
        ctx.body = {
            success: false,
            msg: '不是超级管理员无法增加'
        };
    }

};

module.exports = {
    findAllAdmin,
    findAdmin,
    delAdmin,
    Login,
    Reg
};
