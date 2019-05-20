const router = require("express").Router();
const bookRoute = require('./book');

router.use("/book", bookRoute);

module.exports = router;