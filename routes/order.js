const router = require('koa-router')();
const orderCheck = require('../middleware/orderCheck')
const checkSuperAdmin = require('../middleware/checkSuperAdmin')
const orderController = require('../controllers/order');

router.prefix('/order');

router.post('/userOrder', orderCheck, orderController.userOrder);
router.post('/findNewMatronOrder', orderController.findNewMatronOrder);
router.post('/findAllMatronOrder', orderController.findAllMatronOrder);
router.post('/backOrder', orderController.backOrder);
// router.post('/findArticleByName',orderController.findArticleByName);
// router.post('/addArticle',orderController.addArticle);
// router.post('/updateArticle',orderController.updateArticle);
// router.post('/delArticle',checkSuperAdmin,orderController.delArticle);

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a admin/bar response'
});

module.exports = router;
