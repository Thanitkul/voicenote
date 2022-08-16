import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser")

dotenv.config();

const mysql = require('mysql2/promise');

console.log(process.env.DB_HOST, process.env.DB_PASSWORD)
export const con = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});



import authControllers from "./controllers/auth.js"
import studentControllers from "./controllers/student.js"
import teacherControllers from "./controllers/teacher.js"


// access config var
process.env.TOKEN_SECRET;

app.use(cors());

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Hello! Node.js");
});

app.use("/auth", authControllers)
app.use("/student", studentControllers)
app.use("/teacher", teacherControllers)





server.listen(port, () => {
  console.log("Starting node.js at port " + port);
});