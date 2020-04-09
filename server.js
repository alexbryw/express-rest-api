const express = require('express')
const app = express()
const port = 3000
const Users = require('./Users')

const users = new Users()

//Static will send all files requested from 'public' folder.
app.use(express.static('public'))
app.use(express.json())

//Sends back all users.
app.get('/api/users', function(req, res){
    res.json(users.getUserList())
})

//Add a new user.

//Update an existing users information

//Remove a user

app.listen(port, () => {console.log('Server listening on http://localhost:' + port)})