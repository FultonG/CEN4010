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
        // Access Auth collection
        const collection = mongodbConnection.db().collection("Auth");
        // Find user by email(primary key)
        collection.findOne({ email: data.email }, (findError, findResult) => {
            if (findResult) {
                // Ignore password and object id fields from findResult object
                const {password, _id, ...rest} = findResult;
                cb(200, rest);
            }
            else {
                cb(404, findError);
            }
        });
    },
    getCreditCardsByUser: (data, cb) => {
        // Access CreditCard collection
        const collection = mongodbConnection.db().collection("CreditCard");
        // Find credit cards by user_email(foreign key)
        collection.find({ email: data.email }, (findError, findResults) => {
            if(findResults){
                cb(200, findResults);
            }
            else{
                cb(404, findError);
            }
        });
    },
    addCreditCard: (data, cb) => {
        // Access CreditCard collection
        const collection = mongodbConnection.db().collection("CreditCard");
        // Insert credit card into CreditCard collection
        collection.insertOne(data, (addError, addResult) => {
            if (!addError) {
                cb(200, addResult);
            } else {
                console.log(addError);
                cb(500, addError);
            }
        });
    },
    removeCreditCard: (data, cb) => {
        // Access CreditCard collection
        const collection = mongodbConnection.db().collection("CreditCard");
        // Delete credit card from CreditCard collection
        collection.deleteOne(data, (deleteError, deleteResult) => {
            if (!deleteError) {
                cb(200, deleteResult);
            } else {
                console.log(deleteError);
                cb(500, deleteError);
            }
        });
    },
    updateCreditCard: (data, cb) => {
        // Access CreditCard collection
        const collection = mongodbConnection.db().collection("CreditCard");
        // Update Credit card
        collection.updateOne({ primaryKeys: data.primaryKeys, updates: data.updates }, (error, result) => {
            if (!error) {
                cb(200, result);
            } else {
                console.log(error);
                cb(500, error);
            }
        });
    },
    getShippingAddressesByUser: (data, cb) => {
        // Access ShippingAddress collection
        const collection = mongodbConnection.db().collection("ShippingAddress");
        // Find shipping address by email + address (primary key)
        collection.find({ email: data.email,  address: data.address}, (findError, findResults) => {
            if(findResults){
                cb(200, findResults);
            }
            else{
                cb(404, findError);
            }
        });
    },
    addShippingAddress: (data, cb) => {
        // Access ShippingAddress collection
        const collection = mongodbConnection.db().collection("ShippingAddress");
        // Add shipping address to ShippingAddress collection
        collection.insertOne(data, (addError, addResult) => {
            if (!addError) {
                cb(200, addResult);
            } else {
                console.log(addError);
                cb(500, addError);
            }
        });
    },
    removeShippingAddress: (data, cb) => {
        // Access ShippingAddress collection
        const collection = mongodbConnection.db().collection("ShippingAddress");
        // Delete shipping address from the ShippingAddress collection
        collection.deleteOne(data, (deleteError, deleteResult) => {
            if (!deleteError) {
                cb(200, deleteResult);
            } else {
                console.log(deleteError);
                cb(500, deleteError);
            }
        });
    },
    updateShippingAddress: (data, cb) => {
        // Access ShippingAddress collection
        const collection = mongodbConnection.db().collection("ShippingAddress");
        // Update the shipping address
        collection.updateOne({ primaryKeys: data.primaryKeys, updates: data.updates}, (updateError, updateResult) => {
            if (!updateError) {
                cb(200, updateResult);
            } else {
                console.log(updateError);
                cb(500, updateError);
            }
        });
    }
};

module.exports = user;
