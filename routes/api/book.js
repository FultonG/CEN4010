const router = require('express').Router();
const books = require("../../controllers/books.js");

router.get("/getBooksByPage", (req, res) => {
    books.getBooksByPage(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.get("/getBook", (req, res) => {
    books.getBook(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.put("/createBook", (req, res) => {
    books.createBook(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/updateBook", (req, res) => {
    books.updateBook(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.delete("/deleteBook", (req, res) => {
    books.deleteBook(req.body, (status, data = "ok") => res.status(status).send(data));
});

module.exports = router;