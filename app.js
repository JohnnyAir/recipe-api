const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

require('dotenv').config();

//routes
const recipes_routes = require("./routes/recipes");

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch(e => {
    console.log("error");
    console.error(e);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use("/api/recipes", recipes_routes);

module.exports = app;
