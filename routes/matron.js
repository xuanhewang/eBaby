const router = require('koa-router')();
const checkToken = require('../middleware/checkToken')
const multer = require('koa-multer');
const upload = require('../middleware/uploadFile');
const checkSuperAdmin = require('../middleware/checkSuperAdmin')
const matronController = require('../controllers/matron');


router.prefix('/matron');
//
router.post('/findAllMatron', matronController.findAllMatron);
router.post('/findMatron', matronController.findAllMatron);
router.post('/delMatron', checkSuperAdmin, matronController.delMatron);
// router.post('/updateMatron',matronController.updateMatron);
// router.post('/spider', matronController.spider);

router.post('/login', matronController.Login)
router.post('/register', upload.single('file'), matronController.Reg)

router.get('/', function (ctx, next) {
    ctx.body = 'this is a admin/bar response'
});

module.exports = router;