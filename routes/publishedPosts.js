const express = require('express')
const publishedPostRouter = express.Router();

// const articlesData = require("../fixtures/articles.json")
// const { save } = require("../utils/helperIntegration")
// const { check, validationResult } = require("express-validator");

const PublishedPostController = require("../controllers/publishedPostsController") 


// Get All Published Posts or Search by Title, author or tag
publishedPostRouter.get("/", PublishedPostController.publishedPosts);

module.exports = publishedPostRouter