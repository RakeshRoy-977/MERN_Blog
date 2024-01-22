const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", require: true }],
});

const User_schema = mongoose.model("User", userSchema);

module.exports = User_schema;