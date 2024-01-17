const express = require("express");
const { body } = require("express-validator");
const { signup } = require("../controllers/Auth");
const route = express.Router();

route.post(
  "/signup",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  signup
);

module.exports = route;
