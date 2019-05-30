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
    }
};

module.exports = user;