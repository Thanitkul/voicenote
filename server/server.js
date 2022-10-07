const express = require("express")
const app = require('./app')
const port = process.env.PORT || 3000
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const con = require("./models/db")


// dotenv.config()
// access config var
// process.env.TOKEN_SECRET

const IO = new Server(server, {
    transports: ['websocket', 'polling']
})

IO.on('connection', (socket) => {
  console.log('Socket was connect');

  socket.on('error', (error) => {
      console.log('Socket error: ', error);
  });

  socket.on('disconnect', (error) => {
      console.log('Socket was disconnect');
  });

  socket.on('join_room', (room) => {
      console.log('join_room event ', room)
      socket.join(room);
  });

  socket.on('message', async ({ room, messageText, groupId,  }) => {

      await con.query("INSERT INTO recordings (`courseId`, `groupId`, `data`) VALUE (?, ?, ?)", [room, groupId, messageText]);
      
      IO.to(room).emit('message', messageText)
  });
})

server.listen(port, () => {
  console.log(`Service listening on port ${port}`)
})