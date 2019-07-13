const router = require('express').Router();
const cart = require("../../controllers/cart.js");

router.post("/addToCart", (req, res) => {
    purchase.addToCart(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/updateCartBookQuantiy", (req, res) => {
    purchase.updateCartBookQuantiy(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/removeFromCart", (req, res) => {
    purchase.removeFromCart(req.body,(status, data = "ok") => res.status(status).send(data));
});

module.exports = router;
