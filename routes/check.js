const router = require('koa-router')();
const checkSuperAdmin = require('../middleware/checkSuperAdmin')
const orderController = require('../controllers/order');

router.prefix('/check');

router.post('/userOrder', orderController.userOrder);
router.post('/findNewMatronOrder', orderController.findNewMatronOrder);
router.post('/findAllMatronOrder', orderController.findAllMatronOrder);


router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a admin/bar response'
});

module.exports = router;
