const mongodbConnection = require("../dbconfig/connection.js");

/**
Some helpful resources!
https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/
https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/
https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/
https://docs.mongodb.com/manual/reference/method/db.collection.find/
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/

data - passed to API calls in EditProfileComponent
https://github.com/FultonG/CEN4010/blob/development/client/src/components/profile_management/EditProfileComponent.jsb
cb - callback passed in api file
https://github.com/FultonG/CEN4010/blob/development/routes/api/user.js
*/

const user = {
    getUser: (data, cb) => {
        const collection = mongodbConnection.db().collection("User");
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
