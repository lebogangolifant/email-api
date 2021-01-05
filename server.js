const express = require('express')
const sendMail = require('./send')
const config = require('./config.json')

// load env variables
require('dotenv').config()

const server = express()
const PORT = process.env.PORT || 3001;

server.use(express.json());


server.use(express.urlencoded({ extended: true })) 

server.get('/', (req, res) => {
  res.send('RapidAPI tutorial')
})

server.get('/api/send', async (req, res) => {
    const r = await sendMail(config)
    res.send(r)
  })

  server.post('/api/send', async (req, res) => {
    if (req.body.fromEmail.trim()) {
      config.data.from.email = req.body.fromEmail
    }
    if (req.body.toEmail.trim()) {
      config.data.personalizations[0].to[0].email = req.body.toEmail
    }
    if (req.body.subject.trim()) {
      config.data.personalizations[0].subject = req.body.subject
    }
    if (req.body.content.trim()) {
      config.data.content[0].value = req.body.content
    }
    const r = await sendMail(config)
    res.send(r)
  })

server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})