const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit")

const helmet = require('helmet')
const logger = require('./logging/logger')

require('dotenv').config()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const { connectToMongoDB } = require('./database/db')
const authRoute = require("./routes/authRoute")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const publishedPostRoute = require("./routes/publishedPosts")

// connection to database
connectToMongoDB()

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const limiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// applying rate limiting middleware to all requests
app.use(limiter)

// security middleware
app.use(helmet())

// middleware
app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/publishedPosts", publishedPostRoute)

// routes
// const UserControls = require("./controllers/UserController");
// // const PostControls = require("./controllers/UserController");
// app.get("/users", UserControls.all);
// app.get("/users/create", UserControls.create);
// app.get("/users/:username", UserControls.find);
// app.get("/users/:username/posts", UserControls.getAllPosts);

// error handler middleware
app.use((err, req, res, next) => {
    logger.error(err.message)
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
});

app.listen(PORT || 7000, ()=>{
    logger.info(`Server is running at http://localhost:${PORT}`)
})

module.exports = app;