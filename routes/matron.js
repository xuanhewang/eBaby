const router = require('koa-router')();
const checkToken = require('../middleware/checkToken')
const matronController = require('../controllers/matron');

router.prefix('/matron');

router.get('/findAllAdmin',matronController.findAllAdmin);
router.post('/delAdmin',matronController.delAdmin);
router.post('/spider',matronController.spider);

router.post('/login', matronController.Login)
router.post('/register', matronController.Reg)

router.get('/', function (ctx, next) {
    ctx.body = 'this is a admin/bar response'
});

module.exports = router;