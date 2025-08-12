require("dotenv").config();
const express = require("express");
const homeRoutes = require("./routes/index.route");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", homeRoutes);
app.use("/auth", authRoutes);

module.exports = app;
