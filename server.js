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
        res.status(404).json({ msg: "No users found."})
    } else {
        res.json(users.getUserList())
    }
})

//Add a new user.
app.post('/api/users', function(req, res){
    console.log("from post add user ")
    console.log(req.body)
    if(!req.body.name || !req.body.email || !req.body.userID){
        res.status(400).json({msg: "Provide name, email and userID to create a new user."})
        return
    }

    if(users.addUser(req.body)){
        res.status(201).end()
    } else {
        res.status(400).json({msg: "Provide a unique userID number and a unique email address."})
    }
    
    console.log(req.body)
})

//Update an existing users information.
app.put('/api/users/:id', function(req, res){
    const user = users.findUser(req.params.id)
    if(!user){
        return res.status(404).json({msg: "User not found."})
    }
    
    if(users.updateUserInfo(user, req.body)){
        res.end()
    } else{
        res.status(400).json({msg: "Provide name, email or country to be updated."})
    }
})

//Remove a user.
app.delete('/api/users/:id', function(req, res){
    console.log("Delete user")
    if(users.deleteUser(req.params.id)){
        res.end()
    } else {
        res.status(404).json({msg: "User not found."})
    }
})

//Get a specific user from userID
app.get('/api/users/:id', function(req, res){
    console.log("get find a specific user")
    const user = users.findUser(req.params.id)
    if(!user){
        console.log("user not found")
        res.status(404).send("User not found.")
        return
    } else {
        res.json(user)
    }
})

app.listen(port, () => {console.log('Server listening on http://localhost:' + port)})