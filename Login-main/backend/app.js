const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const app = express();
const cookie_parser = require("cookie-parser")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
app.use(express.json())
app.use(cookie_parser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

dotenv.config({path:"./config/config.env"})



const user = require("./router/userRouter")





app.use("/api/v1",user) 








module.exports = app;