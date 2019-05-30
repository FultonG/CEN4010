const router = require('express').Router();
const user = require("../../controllers/user.js");


router.post("/getUser", (req, res) => {
    user.getUser(req.body, (status, data = "ok") => res.status(status).send(data));
})

module.exports = router;