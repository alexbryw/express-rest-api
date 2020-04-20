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
    if(!req.body.name || !req.body.email){
        res.status(400).json({msg: "Provide name and email to create a new user."})
        return
    }
    
    const newUser = users.addUser(req.body)
    if(newUser){
        res.status(201).json(newUser)
    } else {
        res.status(400).json({msg: "Provide a unique email address."})
    }
})

//Update an existing users information.
app.put('/api/users/:id', function(req, res){
    const user = users.findUser(req.params.id)
    if(!user){
        return res.status(404).json({msg: "User not found."})
    }
    
    if(users.updateUserInfo(user, req.body)){
        res.json(user)
    } else{
        res.status(400).json({msg: "Provide name, email or country to be updated."})
    }
})

//Remove a user.
app.delete('/api/users/:id', function(req, res){
    const deletedUser = users.deleteUser(req.params.id)
    if(deletedUser){
        res.json(deletedUser)
    } else {
        res.status(404).json({msg: "User not found."})
    }
})

//Get a specific user from userID
app.get('/api/users/:id', function(req, res){
    const user = users.findUser(req.params.id)
    if(!user){
        res.status(404).json({msg: "User not found."})
    } else {
        res.json(user)
    }
})

app.listen(port, () => {console.log('Server listening on http://localhost:' + port)})