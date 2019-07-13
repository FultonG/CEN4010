const router = require('express').Router();
const cart = require("../../controllers/cart.js");

router.post("/addToCart", (req, res) => {
    cart.addToCart(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/updateCartBookQuantiy", (req, res) => {
    cart.updateCartBookQuantiy(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/removeFromCart", (req, res) => {
    cart.removeFromCart(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/getCartForUser", (req, res) => {
    cart.getCartForUser(req.body,(status, data = "ok") => res.status(status).send(data));
});

module.exports = router;
