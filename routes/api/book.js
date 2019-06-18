const router = require('express').Router();
const books = require("../../controllers/books.js");

router.get("/", (req, res) => {
    books.getAllBooks((status, data = "ok") => res.status(status).send(data));
});

router.get("/:id", (req, res) => {
    books.getBook(req.params.id, (status, data = "ok") => res.status(status).send(data));
});

router.put("/", (req, res) => {
    books.createBook(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/", (req, res) => {
    books.updateBook(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.delete("/:id", (req, res) => {
    books.deleteBook(req.params.id, (status, data = "ok") => res.status(status).send(data));
});

module.exports = router;