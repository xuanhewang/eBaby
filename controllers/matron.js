/**
 * Created by wang on 17/12/23.
 */
// const ObjectId = require('mongodb').ObjectId;
const matron = require('../models/matron');
const request = require('request')
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../middleware/createToken.js');

const findAllMatron = async (ctx, next) => {
    let count = await matron.matron.count()
    let pageNum = parseInt(ctx.request.body.pageNum) - 1
    let pageSize = parseInt(ctx.request.body.pageSize)
    let allMatron = await matron.findAllMatron(pageNum, pageSize);
    ctx.body = {
        success: true,
        data: {
            count: count,
            data: allMatron
        }
    }
};

const delMatron = async (ctx, next) => {
    // let id = ObjectId(ctx.request.body.id)
    let matronName = ctx.request.headers.username
    let id = ctx.request.body.id
    let matronNow = await matron.findMatron(matronName)
    let matronInfo = await matron.findMatronById(id)
    if (matronInfo.isSuper) {
        ctx.body = {
            success: false,
            msg: '超级管理员无法删除'
        }
    } else {
        if (!matronNow.isSuper) {
            ctx.body = {
                success: false,
                msg: '不是超级管理员'
            }
        } else {
            let doc = await matron.delmatron(id)
            if (doc) {
                ctx.body = {
                    success: true,
                    msg: '删除成功'
                }
            } else {
                ctx.body = {
                    success: false,
                    msg: '删除失败'
                }
            }
        }
    }
}

const Login = async (ctx) => {
    //拿到账号和密码
    let username = ctx.request.body.username;
    let password = sha1(ctx.request.body.password);

    let doc = await matron.findMatron(username);
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
    let matronName = ctx.request.headers.username
    let matronNow = await matron.findMatron(matronName)
    let user = new matron.matron({
        username: ctx.request.body.username,
        password: sha1(ctx.request.body.password), //加密
        token: createToken(this.username),
        name: ctx.request.body.name,
        age: ctx.request.body.age,
        mobile: ctx.request.body.mobile,
        experience: ctx.request.body.experience,
        price: ctx.request.body.price,
        specialty: ctx.request.body.specialty,
        sex: ctx.request.body.sex,
        isworking: ctx.request.body.isworking,
        hometown: ctx.request.body.hometown,
        personalinfo: ctx.request.body.personalinfo,
        imageurl: ctx.request.body.imageurl
    });
    console.log(user)
    //将objectid转换为用户创建时间(可以不用)
    user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');

    let doc = await matron.findMatron(user.username);
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

};

const spider = async (ctx) => {
    let PageNum = 1

    function spider(PageNum) {
        request({
            url: 'http://www.yuesaohome.cn/Ajax/NPageNures.ashx',
            form: {PageNum: PageNum}
        }, function (err, res, body) {
            if (err) {
                console.log(err)
                return false
            }
            let data = JSON.parse(res.body).rows
            for (let i in data) {
                let user = new matron.matron({
                    username: data[i].id,
                    password: sha1(data[i].id),
                    token: createToken(data[i].id),
                    name: data[i].nursename,
                    age: data[i].age,
                    mobile: data[i].mobile,
                    experience: data[i].experience,
                    price: data[i].price,
                    specialty: data[i].specialty,
                    sex: data[i].sex,
                    isworking: data[i].iswork,
                    hometown: data[i].hometown,
                    personalinfo: data[i].personalinfo,
                    imageurl: data[i].imageurl
                })
                user.save((err) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                    console.log('入库成功')
                })
            }
            setTimeout(function () {
                PageNum += 1
                spider(PageNum)
            }, 5000)
        })
    }

    spider(PageNum)
}

module.exports = {
    findAllMatron,
    delMatron,
    Login,
    Reg,
    spider
};
