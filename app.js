const Koa = require('koa')
const app = new Koa()
const path = require('path')
const cors = require('koa2-cors');
const multer = require('koa-multer');
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const admin = require('./routes/admin')
const matron = require('./routes/matron')
const article = require('./routes/article')
const overview = require('./routes/overview')
const order = require('./routes/order')
const check = require('./routes/check')

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
	extension: 'pug'
}))

app.use(cors(
    {
        origin: function (ctx) {
            return '*';
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept','Origin', 'X-Requested-With', 'token', 'username', 'Referer', 'User-Agent']
    }
))
// logger
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(matron.routes(), matron.allowedMethods())
app.use(article.routes(), article.allowedMethods())
app.use(overview.routes(), overview.allowedMethods())
app.use(order.routes(), order.allowedMethods())
app.use(check.routes(), check.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
});

module.exports = app
