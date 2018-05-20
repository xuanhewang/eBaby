const router = require('koa-router')();
const checkToken = require('../middleware/checkToken')
const multer = require('koa-multer');
const upload = require('../middleware/uploadFile');
const checkSuperAdmin = require('../middleware/checkSuperAdmin')
const overviewController = require('../controllers/overview');


router.prefix('/overview');
//
router.get('/count', overviewController.count);
router.get('/matronCity', overviewController.matronCity);
router.get('/matronAge', overviewController.matronAge);
router.get('/moneyChart', overviewController.expChart);
router.get('/artTop', overviewController.artTop);


router.get('/', function (ctx, next) {
    ctx.body = 'this is a admin/bar response'
});

module.exports = router;