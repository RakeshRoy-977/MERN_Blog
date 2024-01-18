const { model } = require("mongoose");
const Blog_schema = require("../Models/Blog");
const { body } = require("express-validator");

//get all
const getall = async (req, res) => {
  try {
    const Data = await Blog_schema.findOne({});
    res.json(Data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//get single
const getsingle = async (req, res) => {
  try {
    const id = req.params.id;
    const Data = await Blog_schema.findById(id);
    res.json(Data);
  } catch (error) {
    return res.status(500).json({ message: error });
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

    const { title, description, img } = req.body;
    const NewData = await Blog_schema.create({ title, description, img });
    res.json(NewData);
  } catch (error) {
    return res.status(500).json({ message: error });
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
    return res.status(500).json({ message: error });
  }
};

//Remove Blog
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    await Blog_schema.findByIdAndDelete(id);
    res.json({ message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { getall, getsingle, create, update, remove };
