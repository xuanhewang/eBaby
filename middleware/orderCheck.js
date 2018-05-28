const order = require('../config/db').orderModel;

module.exports = async (ctx, next) => {
    let user = ctx.request.headers.username
    let matron = ctx.request.body.matron
    let doc = await order.find({
        user: user,
        matron: matron,
        finished: false
    })
    if (doc.length > 0) {
        ctx.body = {
            success: false,
            msg: '您已预定该月嫂，请等待回应'
        }
    } else {
        next()
    }
}