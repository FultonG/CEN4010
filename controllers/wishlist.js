const mongodbConnection = require("../dbconfig/connection.js");

const wishlist = {
    getWishLists: (data, cb) => {
        const collection = mongodbConnection.db().collection("WishList");
        collection.find({ email: data.email }).toArray( (findError, findResult) => {
            if (findResult) {
                cb(200, findResult);
            }
            else {
                cb(404, findError);
            }
        });
    },
    addToWishList: (data, cb) => {
        const collection = mongodbConnection.db().collection("WishList");
        collection.updateOne({email: data.email, wishListId: data.wishListId}, {$addToSet: {books: data.book} }, (addError, addResult) => {
            if (!addError) {
                cb(200, addResult);
            } else {
                console.log(addError);
                cb(500, addError);
            }
        });
    }
};

module.exports = wishlist;
