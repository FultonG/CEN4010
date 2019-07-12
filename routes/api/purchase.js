const router = require('express').Router();
const purchase = require("../../controllers/purchase.js");

router.post("/addPurchase", (req, res) => {
    purchase.addPurchase(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/updatePurchase", (req, res) => {
    purchase.updatePurchase(req.body,(status, data = "ok") => res.status(status).send(data));
});

module.exports = router;
