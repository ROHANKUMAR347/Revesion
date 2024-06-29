const express = require("express");
const authrouter = express.Router();
const authController = require("../Controllers/authController");

authrouter.post("/register", authController.register);
authrouter.post("/login", authController.login);

module.exports = authrouter;
