/**
 * Created by wang on 17/12/23.
 */
const admin = require('../models/admin');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../middleware/createToken.js');

const findAllAdmin = async (ctx, next) => {
    let allAdmin = await admin.findAllAdmin();
    console.log(allAdmin)
    ctx.body = {
        success: true,
        data: allAdmin
    }
};

const Login = async ( ctx ) => {
    //拿到账号和密码
    let username = ctx.request.body.username;
    let password = sha1(ctx.request.body.password);

    let doc = await admin.findAdmin(username);
    if(!doc){
        console.log('检查到用户名不存在');
        ctx.status = 200;
        ctx.body = {
            info: false
        }
    }else if(doc.password === password){
        console.log('密码一致!');

        //生成一个新的token,并存到数据库
        let token = createToken(username);
        console.log(token);
        doc.token = token;
        await new Promise((resolve, reject) => {
            doc.save((err) => {
                if(err){
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
    }else{
        console.log('密码错误!');
        ctx.status = 200;
        ctx.body = {
            msg: '密码错误',
            success: false
        };
    }
};

//注册
const Reg = async ( ctx ) => {
    let user = new admin.admin({
        username: ctx.request.body.username,
        password: sha1(ctx.request.body.password), //加密
        token: createToken(this.username) //创建token并存入数据库
    });
    console.log(user)
    //将objectid转换为用户创建时间(可以不用)
    user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');

    let doc = await admin.findAdmin(user.username);
    if(doc){
        console.log('用户名已经存在');
        ctx.status = 200;
        ctx.body = {
            status: 200,
            success: false
        };
    }else{
        await new Promise((resolve, reject) => {
            user.save((err) => {
                if(err){
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
};

module.exports = {
    findAllAdmin,
    Login,
    Reg
};
