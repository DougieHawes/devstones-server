// import environment variables
require("dotenv").config();

// mongoose connection
const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI;

mongoose.set("useCreateIndex", true);

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"));

// express server
const express = require("express");
const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`app running on port:${port}`));
