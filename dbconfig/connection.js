const { MongoClient } = require("mongodb");
process.env.NODE_ENV === "production" ? null : require("dotenv").config()
let connection = new MongoClient(process.env.MONGODB_URI)
connection.connect(err => {
    if (!err) {
        console.log("Connection to MongoDB established");
    } else {
        console.log(`Could not connect to MongoDB: ${err}`);
    }
});

module.exports = connection;