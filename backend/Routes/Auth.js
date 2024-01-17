const express = require("express");
const { body } = require("express-validator");
const { signup, login } = require("../controllers/Auth");
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

route.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  login
);

module.exports = route;
