const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require("body-parser")
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const con = require("./models/db")

const apiRoutes = require('./controllers')

dotenv.config()

// access config var
process.env.TOKEN_SECRET

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
  res.send("Hello! Node.js")
})

app.use('/api', apiRoutes);

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

  socket.on('message', async ({ room, messageText, recordingId }) => {

      await con.query("UPDATE recordings SET data = CONCAT(data, ?) WHERE id = ?", [messageText, recordingId]);
      
      IO.to(room).emit('message', messageText)
  });
})

server.listen(port, () => {
  console.log(`Service listening on port ${port}`)
})