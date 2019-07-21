const router = require('express').Router();
const purchase = require("../../controllers/purchase.js");

router.post("/addPurchase", (req, res) => {
    purchase.addPurchase(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/getPurchase", (req, res) => {
    purchase.getPurchase(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/getPurchases", (req, res) => {
    purchase.getPurchases(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/updatePurchase", (req, res) => {
    purchase.updatePurchase(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/updateComment", (req, res) => {
    purchase.updateComment(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/updateRating", (req, res) => {
    purchase.updateRating(req.body,(status, data = "ok") => res.status(status).send(data));
});


module.exports = router;
