const router = require('express').Router();
const user = require("../../controllers/user.js");


router.post("/getUser", (req, res) => {
    user.getUser(req.body, (status, data = "ok") => res.status(status).send(data));
})

router.post("/addCreditCard", (req, res) => {
    user.updateCreditCard(req.body, (status, data = "ok") => res.status(status).send(data));
})

router.post("/deleteCreditCard", (req, res) => {
    user.updateCreditCard(req.body, (status, data = "ok") => res.status(status).send(data));
})

router.post("/updateCreditCard", (req, res) => {
    user.updateCreditCard(req.body, (status, data = "ok") => res.status(status).send(data));
})

router.post("/addShippingAddress", (req, res) => {
    user.updateShippingAddress(req.body, (status, data = "ok") => res.status(status).send(data));
})

router.post("/deleteShippingAddress", (req, res) => {
    user.updateShippingAddress(req.body, (status, data = "ok") => res.status(status).send(data));
})

router.post("/updateShippingAddress", (req, res) => {
    user.updateShippingAddress(req.body, (status, data = "ok") => res.status(status).send(data));
})

module.exports = router;
