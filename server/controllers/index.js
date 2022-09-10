const express = require('express')
const routers = express.Router()
const authRoute = require('./auth')
const studentRoute = require('./student')
const teacherRoute = require('./teacher')

routers.use('/auth', authRoute)
routers.use('/student', studentRoute)
routers.use('/teacher', teacherRoute)

module.exports = routers