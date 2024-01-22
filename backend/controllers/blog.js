const mongoose = require("mongoose");
const Blog_schema = require("../Models/Blog");
const { validationResult } = require("express-validator");
const User_schema = require("../Models/Auth");
//get all
const getall = async (req, res) => {
  try {
    const Data = await Blog_schema.find();
    res.json(Data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get single
const getsingle = async (req, res) => {
  try {
    const id = req.params.id;
    const Data = await Blog_schema.findById(id);
    res.json(Data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//create blog
const create = async (req, res) => {
  try {
    //checking inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, img, user } = req.body;
    console.log(user);

    let existingUser = await User_schema.findById(user);
    if (!existingUser) {
      return res
        .status(500)
        .json({ message: "User not found. Please log in." });
    }
    const newBlog = new Blog_schema({
      title,
      description,
      img,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    res.json({ newBlog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// update blog
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, img } = req.body;
    const FindandUpdate = await Blog_schema.findByIdAndUpdate(
      id,
      {
        title,
        description,
        img,
      },
      { new: true }
    );

    res.json(FindandUpdate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Remove Blog
const remove = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Check if the blog exists
    const removedBlog = await Blog_schema.findByIdAndDelete(blogId).populate(
      "user"
    );

    if (!removedBlog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // Remove the blog from the user's blogs array
    await removedBlog.user.blogs.pull(removedBlog);
    await removedBlog.user.save();

    // Respond with a success message
    res.json({ message: "Blog deleted successfully." });
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getbyUserId = async (req, res) => {
  try {
    const id = req.params.id;
    let userBlogs = await User_schema.findById(id).populate("blogs");
    if (!userBlogs) {
      return res.status(404).json({ message: "No Blogs Found" });
    }
    res.json({ Blogs: userBlogs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { getall, getsingle, create, update, remove, getbyUserId };
