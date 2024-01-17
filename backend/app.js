require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectToDB = require("./db");
const route = require("./Routes/Auth");

const app = express();
app.use(cors());
app.use(express.json());

//db connect
connectToDB();

//routes
app.use("/api", route);

app.listen(process.env.port, () =>
  console.log(`server is up at ${process.env.port}`)
);
