const express = require('express')
const router = express.Router()

const bookRoute = require('./book.routes')
const userRoute = require('./user.routes')

bookRoute(router)
userRoute(router)

module.exports = router;