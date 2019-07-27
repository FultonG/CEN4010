const mongodbConnection = require("../dbconfig/connection.js");
const {ObjectId} = require('mongodb');

const wishlist = {
    getWishLists: (primaryKey, cb) => {
        const collection = mongodbConnection.db().collection("WishList");
        collection.find(primaryKey).toArray( (findError, findResult) => {
            if (findResult) {
                cb(200, findResult);
            }
            else {
                cb(404, findError);
            }
        });
    },
    addBookToWishlist: (data, cb) => {
        const collection = mongodbConnection.db().collection("WishList");
        collection.updateOne(data.primaryKeys, {$addToSet: {books: data.book} }, (addError, addResult) => {
            if (!addError) {
                cb(200, addResult);
            } else {
                console.log(addError);
                cb(500, addError);
            }
        });
    },
    removeWishlist: (primaryKeys, cb) => {
        const collection = mongodbConnection.db().collection("WishList");
        collection.removeOne(primaryKeys, (removeError, removeResult) => {
            if (!removeError) {
                cb(200, removeResult);
            } else {
                console.log(removeError);
                cb(500, removeError);
            }
        });
    },
    removeBookFromWishlist: (data, cb) => {
        const collection = mongodbConnection.db().collection("WishList");
        collection.updateOne({email: data.email, wishListId: data.wishListId}, {$pull: {books: data.book}}, (removeError, removeResult) => {
            if (!removeError) {
                cb(200, removeResult);
            } else {
                console.log(removeError);
                cb(500, removeError);
            }
        });
    },
    addWishlist: (data, cb) => {
        const collection = mongodbConnection.db().collection("WishList");
        collection.findOne(data, (findError, findResult) => {
            if (findResult == null) {
                collection.insertOne(data, (addError, addResult) => {
                    if (!addError) {
                        cb(200, addResult);
                    } else {
                        console.log(addError);
                        cb(500, addError);
                    }
                });
            } else {
                console.log(findResult);
                cb(409, findResult);
            }
        });
    },
    renameWishlist: (data, cb) => {
        const collection = mongodbConnection.db().collection("WishList");
        collection.updateOne({email: data.email, wishListId: data.wishListId}, {$set: {name: data.name}}, (err, res) =>{
            if (!err) {
                cb(200, res);
            } else {
                console.log(err);
                cb(500, err);
            }
        });
    }
};

module.exports = wishlist;
