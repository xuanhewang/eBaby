const router = require('koa-router')();
const checkSuperAdmin = require('../middleware/checkSuperAdmin')
const checkController = require('../controllers/check');

router.prefix('/check');

router.post('/submitCheck', checkController.submitCheck);
router.post('/confirmCheck', checkController.confirmCheck);
router.post('/matronSubmitCheck', checkController.matronSubmitCheck);
router.post('/allConfirmCheck', checkController.allConfirmCheck);


router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a admin/bar response'
});

module.exports = router;
