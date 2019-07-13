const mongodbConnection = require("../dbconfig/connection.js"),
    ObjectId = require('mongodb').ObjectId,
    cart = {
        addToCart: (data, cb) => {
            const collection = mongodbConnection.db().collection("ShoppingCart");
            collection.insertOne(data, function (err, result) {
                if (!err) {
                    cb(200, result )
                } else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        removeFromCart: (data, cb) => {
          const collection = mongodbConnection.db().collection("ShoppingCart");
          collection.deleteOne({user_email: data.user_email, book_id: new ObjectId(data.book_id)}, (deleteError, deleteResult) => {
            if (!deleteError) {
                cb(200, deleteResult);
            } else {
                console.log(deleteError);
                cb(500, deleteError);
            }
          });
        },
        getCartForUser: (email, cb) => {
            const collection = mongodbConnection.db().collection("ShoppingCart");
            collection.find(email).toArray( (findError, findResult) => {
                if (findResult) {
                    cb(200, findResult);
                }
                else {
                    console.log(err);
                    cb(404, findError);
                }
            });
        },
        updateCart: (data, cb) => {
            const collection = mongodbConnection.db().collection("ShoppingCart");
            collection.updateOne(data.primaryKeys, data.updates, function (err, result) {
                    !err ? cb(200, result) : cb(500, err);
                });
        },
    };

module.exports = cart;
