require("dotenv").config();
const express = require("express");
const app = express()
const debug = require("debug")("app");


app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "pug");
app.use("/", require("./routes.js"));


const port = process.env.PORT || 3000;
app.listen(process.env.PORT, () => debug("Server running on port 3000"));
