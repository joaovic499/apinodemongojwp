require('dotenv').config()
const AuthController = require("./src/controllers/AuthController")
const express = require('express')
const app = express()

app.use(express.json());

app.use("/auth", AuthController)

app.listen(3000)