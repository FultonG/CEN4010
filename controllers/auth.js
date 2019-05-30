const mongodbConnection = require("../dbconfig/connection.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = {
    authenticateUser: (body, cb) => {
        const collection = mongodbConnection.db().collection("Auth");
        collection.findOne({ email: body.email }, (err, result) => {
            if (result != null) {
                bcrypt.compare(body.password, result.password, function (error, res) {
                    let token = jwt.sign({ username: result.email },
                        "softwareengineering1",
                        {
                            expiresIn: '24h' // expires in 24 hours
                        }
                    )

                    if(error) {
                        cb(500, error);
                    }
                    if(res) {
                        cb(200, token);
                    }
                    else {
                        cb(401, "Wrong email or password!");
                    }
                    
                });
            }
            else {
                cb(401, "Wrong email or password!");
            }
        });
    },
    createUser: (data, cb) => {
        const collection = mongodbConnection.db().collection("Auth");
        collection.findOne({ email: data.email }, (findError, findResult) => {
            if(!findResult){
                bcrypt.hash(data.password, 10, (err, hash) => {
                    data.password = hash;
                    collection.insertOne(data, function (error, result) {
                        if (!(err && error)) {
                            cb(200, result)
                        } else {
                            console.log(err, error);
                            cb(500, err);
                        }
                    });
                });
            }
            else{
                cb(409, findResult);
            }
        });
    },
    getUser: (data, cb) => {
        jwt.verify(data.auth_token, "softwareengineering1", function(err, decoded) {
            if (err) {
                cb(401, err)
            } else {
                const collection = mongodbConnection.db().collection("Auth");
                collection.findOne({ email: data.email }, (findError, findResult) => {
                    if(findResult) {
                        cb(200, findResult);
                    }
                    else{
                        cb(404, findError);
                    }
                });
            }
        });
    }
};

module.exports = auth;