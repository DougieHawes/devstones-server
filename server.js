// import environment variables
require("dotenv").config();

const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 8000;

// express server
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
const morgan = require("morgan");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(expressValidator());
app.use(morgan("dev"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/category", require("./routes/category"));
app.use("/api/product", require("./routes/product"));
app.use("/api/user", require("./routes/user"));

app.listen(port, () => console.log(`app running on port:${port}`));

// mongoose connection
const mongoose = require("mongoose");

mongoose
  .connect(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"));
