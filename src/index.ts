//Import express into my project
import express from 'express'

//impor morgan & dotenv
import morgan from 'morgan'
import * as dotenv from 'dotenv'
dotenv.config()
//import filesystem
import fs from 'fs'
import resize from './resize'

import bodyParser from 'body-parser'

//General Variables
const cachePath = 'src/website/cache/'
const imagesPath = 'src/website/images/'
// Setup empty JS object to act as endpoint for all routes
//Setting a port
const port = 3000
//here i Create my app object with express()
const app: express.Application = express()

// HTTP request logger middleware
app.use(morgan('dev'))

//Initialize the main project folder
app.use(express.static('./'))

//use body-parser in the app
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// add custom error handler middleware as the last middleware

//main functions
//defining a function to convert the given string to a number using unary plus operator
function convertToNumber(value: string): number {
  //using isNaN function to check if the given string is a number or not
  if (isNaN(+value)) {
    return 0
  } else {
    return parseInt(value)
  }
}

// validate the width and height
function isPositiveInteger(str: string) {
  if (typeof str !== 'string') {
    return false
  }

  const num = convertToNumber(str)

  if (Number.isInteger(num) && num > 0) {
    return true
  }

  return false
}

// post
app.get('/resizeImage', resizeImage)
// postMyData
async function resizeImage(req: express.Request, res: express.Response) {
  // check if the image already cashed

  const name = req.query.name
  const width = req.query.width as string
  const height = req.query.height as string

  const oldFile = imagesPath + name

  if (name === undefined) {
    return res.status(400).send({ error: 'Name Required' })
  }

  if (!isPositiveInteger(width)) {
    return res.status(400).send({ error: 'Width must be greater than 0' })
  }

  if (!isPositiveInteger(height)) {
    return res.status(400).send({ error: 'Height  must be greater than 0 ' })
  }

  if (fs.existsSync(oldFile) === false) {
    return res.status(404).send({ error: `Image ${oldFile} not found ` })
  }

  //set the new name
  const newName = width + '_' + height + '_' + name
  const newFile = cachePath + newName
  try {
    if (fs.existsSync(cachePath + newName)) {
      //file exists
    } else {
      const returnedResult = await resize(
        oldFile,
        convertToNumber(width),
        convertToNumber(height),
        newFile
      )
      if (returnedResult != 'ok') {
        return res.status(400).send(returnedResult)
      }
    }
    res.json(newName)

    // .render("details",{name: newName})
  } catch (err) {
    console.error(err)
  }
}

// get

//Setting my application to listen on ny port and output a message to the console with app.listen
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

export { convertToNumber, app, resizeImage }
