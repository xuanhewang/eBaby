const router = require('koa-router')();
const checkToken = require('../middleware/checkToken')
const checkSuperAdmin = require('../middleware/checkSuperAdmin')
const adminController = require('../controllers/admin');

router.prefix('/admin');

router.post('/findAllAdmin',adminController.findAllAdmin);
// router.post('/findAdmin',adminController.findAdmin);
router.post('/delAdmin',checkSuperAdmin,adminController.delAdmin);

router.post('/login', adminController.Login)
router.post('/register', adminController.Reg)

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a admin/bar response'
});

module.exports = router;
