const mongodbConnection = require("../dbconfig/connection.js"),
    ObjectId = require('mongodb').ObjectId,
    purchase = {
        addPurchase: (data, cb) => {
            const collection = mongodbConnection.db().collection("Purchase");
            collection.insertOne({user_email: data.user_email, book_id: new ObjectId(data.book_id), quantity: data.quantity}, function (err, result) {
                if (!err) {
                    cb(200, result )
                } else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        getPurchase: (primaryKeys, cb) => {
            const collection = mongodbConnection.db().collection("Purchase");
            collection.findOne(primaryKeys, function (err, result) {
                if (!err) {
                    cb(200, result )
                } else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        getPurchases: (data, cb) => {
            const collection = mongodbConnection.db().collection("Purchase");

            const primaryKey = 'book_id' in data ? {book_id : new ObjectId(data.book_id)} : data;
            collection.find(primaryKey).toArray( (findError, findResult) => {
                if (findResult) {
                    cb(200, findResult);
                }
                else {
                    console.log(err);
                    cb(404, findError);
                }
            });
        },
        updatePurchase: (data, cb) => {
            const collection = mongodbConnection.db().collection("Purchase");
            collection.updateOne(
                { user_email: data.primaryKeys.user_email, book_id: new ObjectId(data.primaryKeys.book_id) },
                { $set: data.updates }, function (err, result) {
                    !err ? cb(200, result) : cb(500, err);
                });
        },
    };

module.exports = purchase;
