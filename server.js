const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./src/routes/routes')
require('dotenv').config()


const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 5000000 }))

app.use('/api', router)

app.listen(port, () => {
    console.log('Server running on port', port);
})