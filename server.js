const express = require('express')
const app = express()
const port = 3000

app.get('/', function(req, res){
    res.send('<h1>Hello from express!<h1>')
})

app.listen(port, () => {console.log("Server listening on http://localhost:" + port)})