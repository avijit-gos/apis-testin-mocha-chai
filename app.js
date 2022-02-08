/** @format */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");

mongoose.connect(process.env.DB_CONNECTION);
mongoose.connection.on("error", () => console.log("DB is not connected"));
mongoose.connection.on("connected", () => console.log("DB is connected"));

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/", require("./server/Routers/TodoRouters"));
app.use((req, res, next) => {
  res.status(404).json({ msg: "Error 404! Page not found" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App listening at port:${port}`));

module.exports = app;
