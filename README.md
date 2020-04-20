# express-rest-api   

This express rest API has 5 endpoints in server.js:   
GET '/api/users' : a list of all users   
POST '/api/users' : add a new user.   
PUT '/api/users:id' : update a users info.   
DELETE '/api/users:id' : remove a user.   
And GET '/api/users:id' : get one user from id.   
   
The endpoints can be tested in the request.rest file if you have vscode 'Rest Client' installed, or you could visit http://localhost:3000   
   
A user has 4 properties:   
name, email, id, country.   
   
The users are managed in the 'Users' class located in Users.js where update, add new user, delete and file storage to userList.json happens.   
   
In /public/index.html and /public/script.js all the endpoint are available for basic testing.
   
https://github.com/alexbryw/express-rest-api   
   
Install and run from console.   
1. npm install   
2. node server.js  
From browser visit http://localhost:3000   