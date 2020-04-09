const express = require('express')
const app = express()
const port = 3000

//Static will send all files requested from 'public' folder.
app.use(express.static('public'))

app.listen(port, () => {console.log("Server listening on http://localhost:" + port)})