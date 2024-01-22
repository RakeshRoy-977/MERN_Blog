const express = require("express");
const { body } = require("express-validator");
const {
  getall,
  getsingle,
  create,
  update,
  remove,
  getbyUserId,
} = require("../controllers/blog");

const route = express.Router();

//get all blogs
route.get("/all", getall);

//get single blog
route.get("/:id", getsingle);

//create blog
route.post(
  "/create",
  [
    body(`title`).isLength({ min: 3 }),
    body(`description`).isLength({ min: 10 }),
    body(`img`).exists(),
    body(`user`).exists(),
  ],
  create
);

//update blog with id
route.patch("/update/:id", update);

//delete blog with id
route.delete("/delete/:id", remove);

route.get("/user/:id", getbyUserId);

module.exports = route;
