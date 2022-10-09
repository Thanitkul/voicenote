const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const port = process.env.PORT || 3000

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

module.exports = app;