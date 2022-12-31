const mongoose = require("mongoose");
const logger = require("../logging/logger");
require("dotenv").config()

const MONGO_URL = process.env.MONGO_URL


//checking the connection
function connectToMongoDB(){
    mongoose.connect(MONGO_URL)

    mongoose.connection.on("connected", () => {
        logger.info("Connected to MongoDB Successfully!");
    });

    mongoose.connection.on("error", (err) => {
        logger.error("An error occurred while connecting to MongoDB");
        logger.error(err.message);
    })
}

module.exports = {
    connectToMongoDB
}