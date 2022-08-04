import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const express = require("express");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser")

import { PrismaClient } from '@prisma/client'

import authControllers from "./controllers/auth.js"
import studentControllers from "./controllers/student.js"
import teacherControllers from "./controllers/teacher.js"

const prisma = new PrismaClient();

// get config vars
dotenv.config();

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