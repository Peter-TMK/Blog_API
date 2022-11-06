const express = require('express');
const AuthRouter = express.Router();

const AuthController = require("../controllers/authController")

// Register
AuthRouter.post("/register", AuthController.signup);

// Login
AuthRouter.post("/login", AuthController.login);

module.exports = AuthRouter
