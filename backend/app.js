require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectToDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

//db connect
connectToDB();

//Auth routes
app.use("/api", require("./Routes/Auth"));
//blog Routes
app.use("/blog", require("./Routes/blog"));

app.listen(process.env.port, () =>
  console.log(`server is up at ${process.env.port}`)
);
