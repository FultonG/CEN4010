const router = require('express').Router();
const wishlist = require("../../controllers/wishlist.js");

router.post("/addBookToWishlist", (req, res) => {
    wishlist.addBookToWishlist(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/removeWishlist", (req, res) => {
    wishlist.removeWishlist(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/addWishlist", (req, res) => {
    wishlist.addWishlist(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/renameWishlist", (req, res) => {
    wishlist.renameWishlist(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/removeBookFromWishlist", (req, res) =>{
    wishlist.removeBookFromWishlist(req.body, (status, data = "ok") => res.status(status).send(data));
});
router.post("/", (req, res) => {
    wishlist.getWishLists(req.body, (status, data = "ok") => res.status(status).send(data));
});

module.exports = router;