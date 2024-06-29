const express = require("express");
const countryRouter = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const countryController = require("../Controllers/countryController");
countryRouter.get(
  "/country/:currencyCode",
  authMiddleware,
  countryController.getCountryByCurrency
);

module.exports = countryRouter;
