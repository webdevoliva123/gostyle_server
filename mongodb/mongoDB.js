const mongo = require('mongoose');

const connect_mongo = () => {
    mongo.set("strictQuery", false);
    mongo.connect(process.env.MONGO_URI).then(() => {
        console.log(`Oliva Trend's server is connected to MongoDB.`);
    }).catch((err) => {
        console.log(`Oliva Trend's server is not connected to mongoDB. Error: ${err}`);
    })
}

module.exports = connect_mongo

