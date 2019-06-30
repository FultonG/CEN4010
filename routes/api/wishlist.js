const router = require('express').Router();
const wishlist = require("../../controllers/wishlist.js");

router.post("/add", (req, res) => {
    wishlist.addToWishList(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/", (req, res) => {
    wishlist.getWishLists(req.body, (status, data = "ok") => res.status(status).send(data));
});

module.exports = router;