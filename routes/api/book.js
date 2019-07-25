const router = require('express').Router();
const books = require("../../controllers/books.js");

router.post("/getBook", (req, res) => {
    books.getBook(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/getBooksByPage", (req, res) => {
    books.getBooksByPage(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/getBookByAuthor", (req, res) => {
    books.getBookByAuthor(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/createBook", (req, res) => {
    books.createBook(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/updateBookAverageRating", (req, res) => {
    books.updateBookAverageRating(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/deleteBook", (req, res) => {
    books.deleteBook(req.body, (status, data = "ok") => res.status(status).send(data));
});

module.exports = router;
