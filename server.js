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
app.post('/api/users', function(req, res){
    console.log("from post add user ")
    console.log(req.body)
    res.send()
})

//Update an existing users information.
app.put('/api/users', function(req, res){
    console.log("from put update user info")
    console.log(req.body)
    res.send()
})

//Remove a user.
app.delete('/api/users', function(req, res){
    console.log("Delete user")
    console.log(req.body)
    res.send()
})

app.listen(port, () => {console.log('Server listening on http://localhost:' + port)})