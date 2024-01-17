const { validationResult } = require("express-validator");
const User_schema = require("../Models/singup");

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
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = { signup, login };
