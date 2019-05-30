const router = require("express").Router();
const auth = require('../../middleware/auth');
const authRoute = require('./auth');
const bookRoute = require('./book');
const usersRoute = require('./user');

router.use('/auth', authRoute);
router.use("/book", auth.checkToken, bookRoute);
router.use("/user", auth.checkToken, usersRoute);

module.exports = router;