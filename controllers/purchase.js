const mongodbConnection = require("../dbconfig/connection.js"),
    ObjectId = require('mongodb').ObjectId,
    purchase = {
        addPurchase: (data, cb) => {
            let myPurchase = data.user_email;
            const collection = mongodbConnection.db().collection("Purchase");
            collection.insertOne({user_email: myPurchase.user_email, book_id: myPurchase.book_id, quantity: myPurchase.quantity}, function (err, result) {
                if (!err) {
                    cb(200, result )
                } else {
                    console.log(err);
                    cb(500, err);
                }
            });
            
        },
        getPurchase: (data, cb) => {
            let myPurchase = data.user_email;
            const collection = mongodbConnection.db().collection("Purchase");
            collection.findOne({user_email: myPurchase.user_email, book_id: myPurchase.book_id}, function (err, result) {
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
            collection.find({user_email: data.email, book_id: data._id}).toArray( (findError, findResult) => {
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
            collection.updateOne({ _id: data.primaryKeys },
                { $set: data.updates }, function (err, result) {
                    !err ? cb(200, result) : cb(500, err);
                });
        },
        updateComment: (data, cb) => {
            const collection = mongodbConnection.db().collection("Purchase");
            collection.updateOne({ _id: data.primaryKeys },
                { $set: data.updates }, function (err, result) {
                    !err ? cb(200, result) : cb(500, err);
                });
        },
        updateRating: (data, cb) => {
            const collection = mongodbConnection.db().collection("Purchase");
            collection.updateOne({ _id: data.primaryKeys },
                { $set: data.updates }, function (err, result) {
                    !err ? cb(200, result) : cb(500, err);
                });
        },
    };

module.exports = purchase;
