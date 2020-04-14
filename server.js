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
    if(!users.getUserList().length){
        res.status(404).send("No users found.")
    } else {
        res.json(users.getUserList())
    }
})

//Add a new user.
app.post('/api/users', function(req, res){
    console.log("from post add user ")
    users.addUser(req.body.name,req.body.eMail, req.body.userID, req.body.country)
    console.log(req.body)
    res.status(201).end()
})

//Update an existing users information.
app.put('/api/users/:id', function(req, res){
    console.log("from put update user info")
    users.updateUserEmail(req.params.id, req.body.nextEmail)
    console.log(req.body)
    res.end()
})

//Remove a user.
app.delete('/api/users/:id', function(req, res){
    console.log("Delete user")
    users.deleteUser(req.params.id)
    console.log(req.body)
    res.send()
})

//Get a specific user from userID
app.get('/api/users/:id', function(req, res){
    console.log("get find a specific user")
    console.log(req.params)
    //400 bad req (wrong input or no input)
    //404 user not found (proper input type but not found.)
    const user = users.getUserList().find( ({ userId }) => userId === parseInt(req.params.id))
    if(!user){
        console.log("user not found")
        res.status(404).send("user not found")
        return
    }
    res.json(user)
})

app.listen(port, () => {console.log('Server listening on http://localhost:' + port)})