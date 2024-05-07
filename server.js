require('dotenv').config()
const AuthController = require("./src/controllers/AuthController");
const AdminController = require("./src/controllers/AdminController");
const authenticateMiddleware = require("./src/middlewares/authenticate");
const express = require('express')
const app = express()

app.use(express.json());

app.use("/auth", AuthController)
app.use("/admin", authenticateMiddleware, AdminController);

app.listen(3000)