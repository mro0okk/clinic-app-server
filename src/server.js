import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"
import viewEngine from "./config/viewEngine.js"
import initWebRoutes from "./routes/web.js"
import connectDB from "./config/connectDB"
const app = express()
dotenv.config()
let port = process.env.PORT || 5000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.REACT_ENV)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  )
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
  res.setHeader("Access-Control-Allow-Credentials", true)
  next()
})

viewEngine(app)
initWebRoutes(app)
connectDB()

app.listen(port, (req, res) => {
  console.log(`backend NodeJS is running on the PORT: ${port}`)
})
