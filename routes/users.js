const router = require('koa-router')();
const checkToken = require('../middleware/checkToken')
const UserController = require('../controllers/user');

router.prefix('/users');

router.get('/', UserController.findAllUser);

router.post('/login', UserController.Login)
router.post('/register', UserController.Reg)

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
});

module.exports = router;
