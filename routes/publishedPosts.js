const express = require('express')
const publishedPostRouter = express.Router();

const PublishedPostController = require("../controllers/publishedPostsController") 


// Get All Published Posts or Search by Title, author or tag
publishedPostRouter.get("/", PublishedPostController.publishedPosts);

module.exports = publishedPostRouter