const mongodbConnection = require("../dbconfig/connection.js");

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
        collection.findOne(data.updates.$set.name, (findError, findResult) => {
            if (findResult == null) {
                collection.updateOne(data, (updateError, updateResult) => {
                    if (!updateError) {
                        cb(200, updateResult);
                    } else {
                        console.log(updateError);
                        cb(500, updateError);
                    }
                });
            } else {
                console.log(findResult);
                cb(409, findResult);
            }
        });
    }
};

module.exports = wishlist;
