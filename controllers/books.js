const mongodbConnection = require("../dbconfig/connection.js"),
    ObjectId = require('mongodb').ObjectId,
    books = {
        createBook: (data, cb) => {
            const collection = mongodbConnection.db().collection("books");
            collection.insertOne(data, function (err, result) {
                if (!err) {
                    cb(200, result )
                } else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        getBook: (name, cb) => {
            const collection = mongodbConnection.db().collection("books");
            collection.findOne({ bookName: name }, (err, result) => {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        getAllBooks: cb => {
            const collection = mongodbConnection.db().collection("books");
            collection.find({}).toArray((err, result) => {
                if (!err) {
                    let books = result.map(book => book.bookName);
                    cb(200, books)
                }
                else {
                    cb(500, err);
                }
            });
        },
        deleteBook: (name, cb) => {
            const collection = mongodbConnection.db().collection("books");
            collection.deleteOne({ bookName: name }, function (err, result) {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        updateBook: (data, cb) => {
            const { _id, ...rest } = data
            const collection = mongodbConnection.db().collection("books");
            collection.updateOne({ _id: new ObjectId(data._id) }, { $set: rest }, function (err, result) {
                !err ? cb(200, result) : cb(500, err);
            });
        }
    };

module.exports = books;