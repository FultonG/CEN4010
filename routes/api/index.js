const router = require("express").Router();
const auth = require('../../middleware/auth');
const authRoute = require('./auth');
const bookRoute = require('./book');
const usersRoute = require('./user');
const wishList = require('./wishlist');
const purchaseRoute = require('./purchase');

router.use('/auth', authRoute);
router.use("/book", bookRoute);
router.use("/purchase", purchaseRoute);
router.use("/profile_management", auth.checkToken, usersRoute);
router.use("/wishlist", auth.checkToken, wishList);

module.exports = router;
