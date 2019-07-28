const mongodbConnection = require("../dbconfig/connection.js"),
    ObjectId = require('mongodb').ObjectId,
    books = {
        createBook: (data, cb) => {
            const collection = mongodbConnection.db().collection("Book");
            collection.insertOne(data, function (err, result) {
                if (!err) {
                    cb(200, result )
                } else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        getAllBooks: (data, cb) => {
            const collection = mongodbConnection.db().collection("Book");
            collection.find({}).toArray((err, result) => {
                if (!err) {
                    cb(200, result)
                }
                else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        getBookByAuthor: (data, cb) => {
            const collection = mongodbConnection.db().collection("Book");
            collection.find({author: data.author}).skip(10*(data.page - 1)).limit(10).toArray((err, result) => {
                if (!err) {
                    cb(200, result)
                }
                else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        getBooksByPage: (page, cb) => {
            const collection = mongodbConnection.db().collection("Book");
            collection.find().skip(10*(page - 1)).limit(10).toArray((err, result) => {
                if (!err) {
                    cb(200, result)
                }
                else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        deleteBook: (id, cb) => {
            const collection = mongodbConnection.db().collection("Book");
            collection.deleteOne({ _id: new ObjectId(id) }, function (err, result) {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        getBook: (id, cb) => {
            const collection = mongodbConnection.db().collection("Book");
            let myID = new ObjectId(id._id);
            collection.findOne({ _id: myID }, (findError, findResult) => {
                if (findResult) {
                    cb(200, findResult);
                }
                else {
                    cb(404, findError);
                }
             });
             
         },
        addBookReview: (data, cb) => {
            let bookID = new ObjectId(data._id);
            const collection = mongodbConnection.db().collection("Book");
            collection.updateOne({_id: bookID}, {$addToSet: {review: data.review}}, (addError, addResult) => {
            if (!addError) {
                cb(200, addResult);
            } else {
                console.log(addError);
                cb(500, addError);
              }
            });
            
        },
        updateBookAverageRating: (id, cb) => {
            const purchaseCollection = mongodbConnection.db().collection("Purchase");
            const avgRating = purchaseCollection.find({ _id: new ObjectId(id) }).toArray((err, result) => {
                if (!err) {
                    const ratingSum = 0;
                    
                    result.forEach((rating) => {
                        ratingSum += rating;
                    });
                    
                    const avgRating = ratingSum / result.length;
                    
                    const bookCollection = mongodbConnection.db().collection("Book");
                    bookCollection.updateOne({ _id: new ObjectId(id) },
                        { $set: {"avg_rating": avgRating} }, function (err, result) {
                            !err ? cb(200, result) : cb(500, err);
                        });
                }
                else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
    };

module.exports = books;
