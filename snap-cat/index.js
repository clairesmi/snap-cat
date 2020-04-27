const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('./lib/logger')
const router = require('./config/router')

const { port, dbURI } = require('./config/environment')

// connecting to Mongo and using console log to check the connection is working

mongoose.connect(dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, 
  () => console.log('Mongo is connected') 
)

app.use(express.static(`${__dirname}/dist`))

// body-parser takes the objects entered into the body and reassembles them into the array

app.use(bodyParser.json())

// logger logs our requests and helps us to know that they are working correctly 

app.use(logger)

// router pulls in the url routes that each function from controller is sent to 

app.use('/api', router)

// error message comes after router so that if a route is not found then it will move on to the error message
// * is a catch all 
app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`) )


// telling the app which port to listen to and using console log to check that it is working

app.listen(port, () => console.log(`Running on port ${port}`))