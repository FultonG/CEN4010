const router = require('express').Router();
const auth = require("../../controllers/auth.js");

router.post("/", (req, res) => {
    auth.authenticateUser(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/create", (req, res) => {
    auth.createUser(req.body, (status, data = "ok") => res.status(status).send(data));
});

module.exports = router;