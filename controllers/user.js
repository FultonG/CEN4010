const mongodbConnection = require("../dbconfig/connection.js");
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
