/**
 * Created by wang on 17/12/23.
 */
// const ObjectId = require('mongodb').ObjectId;
const matron = require('../models/matron');
const request = require('request')
const moment = require('moment');
const fs = require('fs')
const multer = require('koa-multer');
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

const findMatron = async (ctx, next) => {
    let username = ctx.request.body.username
    try{
        let doc = await matron.findMatron(username)
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

const findMatronByCity = async (ctx, next) => {
    let city = ctx.request.body.city
    try{
        let doc = await matron.findMatronByCity(city)
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

const updateMatron = async(ctx, next) => {
    let id = ctx.request.body.upMatron._id
    console.log(id);
    console.log( ctx.request.body.upMatron.name,);
    let doc = await matron.matron.findOneAndUpdate({_id: id},{
        // username: ctx.req.body.username,
        // password: sha1(ctx.req.body.password), //加密
        // token: createToken(this.username),
        name: ctx.request.body.upMatron.name,
        age: ctx.request.body.upMatron.age,
        mobile: ctx.request.body.upMatron.mobile,
        experience: ctx.request.body.upMatron.experience,
        price: ctx.request.body.upMatron.price,
        specialty: ctx.request.body.upMatron.specialty,
        sex: ctx.request.body.upMatron.sex,
        isworking: ctx.request.body.upMatron.isworking,
        hometown: ctx.request.body.upMatron.hometown,
        personalinfo: ctx.request.body.upMatron.personalinfo,
        // imageurl: ctx.req.file.filename
    })
    if(doc) {
        ctx.status = 200;
        ctx.body = {
            msg: '修改成功',
            success: true
        }
    } else {
        ctx.status = 201;
        ctx.body = {
            msg: '修改失败',
            success: false
        }
    }
}

const delMatron = async (ctx, next) => {
    // let id = ObjectId(ctx.request.body.id)
    // let matronName = ctx.request.headers.username
    let id = ctx.request.body.id
    ctx.status = 200
    ctx.body = {
        success: true,
        msg: '删除成功'
    }
    let doc = await matron.matron.findOneAndRemove({_id: id})
    if (doc) {
        ctx.status = 200;
        ctx.body = {
            success: true,
            msg: '删除成功'
        }
    }

    // for (let i in id) {
    //     try {
    //         let doc = await matron.matron.findOneAndRemove({_id: id[i]})
    //         if (doc) {
    //             ctx.status = 200;
    //             ctx.body = {
    //                 success: true,
    //                 msg: '删除成功'
    //             }
    //         } else {
    //             ctx.status = 200;
    //             ctx.body = {
    //                 success: false,
    //                 msg: '删除失败'
    //             }
    //         }
    //     } catch (err) {
    //         ctx.status = 200;
    //         ctx.body = {
    //             success: false,
    //             msg: '删除失败'
    //         }
    //     }
    // }


}

const Login = async (ctx) => {
    //拿到账号和密码
    let username = ctx.request.body.username;
    let password = sha1(ctx.request.body.password);

    let doc = await matron.findMatron(username);
    console.log(doc)
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
    let user = new matron.matron({
        username: ctx.req.body.username,
        password: sha1(ctx.req.body.password), //加密
        token: createToken(this.username),
        name: ctx.req.body.name,
        age: ctx.req.body.age,
        mobile: ctx.req.body.mobile,
        experience: ctx.req.body.experience,
        price: ctx.req.body.price,
        specialty: ctx.req.body.specialty,
        sex: ctx.req.body.sex,
        isworking: ctx.req.body.isworking,
        hometown: ctx.req.body.hometown,
        personalinfo: ctx.req.body.personalinfo,
        imageurl: ctx.req.file.filename
    });
    console.log(user)
    //将objectid转换为用户创建时间(可以不用)
    user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');

    let doc = await matron.findMatron(user.username);
    if (doc) {
        console.log('用户名已经存在');
        fs.unlink(`public/images/${ctx.req.file.filename}`, function (err) {
            if (err) return console.log(err);
            console.log('文件删除成功');
        })
        ctx.status = 200;
        ctx.body = {
            status: 406,
            msg: '用户名已经存在',
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
    // let doc = await matron.findAllMatron()
    // for(let i in doc) {
    //     let Name = doc[i].username
    //     console.log(Name)
    //     let res = await matron.matron.findOneAndUpdate(Name, {$set: {imageurl: `${Name}.jpg`}})
    //     console.log(res)
    //     // request(`http://www.yuesaohome.cn/${doc[i].imageurl}`).pipe(fs.createWriteStream(`./images/${imgName}.jpg`))
    // }
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
                    imageurl: `${data[i].id}.jpg`
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
            }, 100)
        })
    }

    spider(PageNum)
}

module.exports = {
    findAllMatron,
    findMatron,
    findMatronByCity,
    updateMatron,
    delMatron,
    Login,
    Reg,
    spider
};
