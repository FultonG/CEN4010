const router = require("express").Router();
const auth = require('../../middleware/auth');
const authRoute = require('./auth');
const bookRoute = require('./book');

router.use('/auth', authRoute);
router.use("/book", auth.checkToken, bookRoute);

module.exports = router;