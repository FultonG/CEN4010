const mongodbConnection = require("../dbconfig/connection.js");

/**
Some helpful resources!
https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/
https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/
https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/
https://docs.mongodb.com/manual/reference/method/db.collection.find/
*/

const user = {
    getUser: (data, cb) => {
        const collection = mongodbConnection.db().collection("Auth");
        collection.findOne({ email: data.email }, (findError, findResult) => {
            if (findResult) {
                const {password, _id, ...rest} = findResult;
                cb(200, rest);
            }
            else {
                cb(404, findError);
            }
        });
    },
    getCreditCardsByUser: (data, cb) => {},
    addCreditCard: (data, cb) => {},
    removeCreditCard: (data, cb) => {},
    updateCreditCard: (data, cb) => {},
    getShippingAddressesByUser: (data, cb) => {},
    addShippingAddress: (data, cb) => {},
    removeShippingAddress: (data, cb) => {},
    updateShippingAddress: (data, cb) => {}
};

module.exports = user;
