const mongodbConnection = require("../dbconfig/connection.js"),
    ObjectId = require('mongodb').ObjectId,
    books = {
        createBook: (data, cb) => {
            const collection = mongodbConnection.db().collection("Book");
            collection.insertOne(data, function (err, result) {
                if (!err) {
                    cb(200, result )
                } else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        getBook: (id, cb) => {
            const collection = mongodbConnection.db().collection("Book");
            collection.findOne({ _id: new ObjectId(id) }, (err, result) => {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        getBooksByPage: (page, cb) => {
            const collection = mongodbConnection.db().collection("Book");
            collection.find().skip(5*(page - 1)).limit(5).toArray((err, result) => {
                if (!err) {
                    cb(200, result)
                }
                else {
                    cb(500, err);
                }
            });
        },
        deleteBook: (id, cb) => {
            const collection = mongodbConnection.db().collection("Book");
            collection.deleteOne({ _id: new ObjectId(id) }, function (err, result) {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        updateBook: (data, cb) => {
            const collection = mongodbConnection.db().collection("Book");
            collection.updateOne({ _id: new ObjectId(data.primaryKeys) },
                { $set: data.updates }, function (err, result) {
                    !err ? cb(200, result) : cb(500, err);
                });
        }
    };

module.exports = books;