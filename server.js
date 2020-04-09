const express = require('express')
const app = express()
const port = 3000
const Users = require('./Users')

const users = new Users()
//Static will send all files requested from 'public' folder.
app.use(express.static('public'))

console.log(users.getUserList())

app.listen(port, () => {console.log('Server listening on http://localhost:' + port)})