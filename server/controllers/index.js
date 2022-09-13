const express = require('express')
const routers = express.Router()
const authRoute = require('./auth')
const studentRoute = require('./student')
const teacherRoute = require('./teacher')
const devRoute = require('./dev')

routers.use('/auth', authRoute)
routers.use('/student', studentRoute)
routers.use('/teacher', teacherRoute)
routers.use('/dev', devRoute)

module.exports = routers