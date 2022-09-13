const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require("body-parser")
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")

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

const io = new Server(server)

io.on('connection', (socket) => {
    console.log('a user connected')
})

server.listen(port, () => {
  console.log("Starting node.js at port " + port)
})