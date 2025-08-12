const express = require("express");
const homeRoutes = require("./routes/index.route");
const authRoutes = require("./routes/auth.route");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/auth", authRoutes);

module.exports = app;
