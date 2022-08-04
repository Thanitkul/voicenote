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

app.get('/courses/:userId', async (req, res, next) => {
  try {
    let courses;
    if (!req.params.userId) {
      courses = await prisma.Course.findMany({
        where: {
          userId: req.params.userId
        }
      });
    } else {
      throw new Error()
    }

    res.send(courses);
  } catch (error) {
    next(error);
  }

})

app.use("/auth", authControllers)

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.id);
});





server.listen(port, () => {
  console.log("Starting node.js at port " + port);
});