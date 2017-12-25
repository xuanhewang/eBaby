const router = require('koa-router')();
const UserController = require('../controllers/user');

router.prefix('/users');

router.get('/', UserController.findAllUser);

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
});

module.exports = router;
