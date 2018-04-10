const router = require('koa-router')();
const checkToken = require('../middleware/checkToken')
const adminController = require('../controllers/admin');

router.prefix('/admin');

router.post('/findAllAdmin',adminController.findAllAdmin);
router.post('/delAdmin',adminController.delAdmin);

router.post('/login', adminController.Login)
router.post('/register', adminController.Reg)

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a admin/bar response'
});

module.exports = router;
