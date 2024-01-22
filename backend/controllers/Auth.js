const { validationResult } = require("express-validator");
const User_schema = require("../Models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    //checking inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    //check if user already reg
    let newUser = await User_schema.findOne({ email });
    if (newUser) {
      return res.status(401).json({ message: "user Already existe" });
    }
    //hashing password
    const salting = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salting);
    //save new user
    const newUserData = await User_schema.create({
      name,
      email,
      password: hashPass,
      blogs: [],
    });

    res.json({ newUserData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    //checking inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    //checking if user reg
    const userChecking = await User_schema.findOne({ email });
    if (!userChecking) {
      return res.status(401).json({ message: "please check your credentials" });
    }

    const comparePass = await bcrypt.compare(password, userChecking.password);

    if (!comparePass) {
      return res.status(401).json({ message: "please check your credentials" });
    }

    res.json(userChecking);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login };
