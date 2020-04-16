class Users{
    constructor(){
        this.fs = require('fs')
        this.userIdCounter = 0
        this.userList = [
            {
                name: "Alex",
                email: "alex@alex.com",
                id: 1,
                country: "Sweden"
            },
            {
                name: "Rex",
                email: "rex@rex.com",
                id: 2,
                country: "Belgium"
            }
        ]
        this.loadUserList()
    }

    getUserList(){
        return this.userList
    }

    addUser(newUserInfo){
        const newUser = {
            name: newUserInfo.name,
            email: newUserInfo.email,
            id: this.getNewUserId(),
            country: newUserInfo.country ? newUserInfo.country : ""
        }
        console.log("from add new user")
        console.log(newUser)
        if(this.findEmail(newUserInfo.email)){
            console.log("Provide a unique email.")
            return false
        } else {
            this.userList.push(newUser)
            return newUser
        }
    }

    updateUserInfo(user, newUserInfo){
        console.log(user, newUserInfo)
        if(newUserInfo.name || newUserInfo.email || newUserInfo.country){
            user.name = newUserInfo.name ? newUserInfo.name : user.name
            user.email = newUserInfo.email ? newUserInfo.email : user.email
            user.country = newUserInfo.country ? newUserInfo.country : user.country
            return true
        } else{
            console.log("Update info error.")
            return false
        }
    }

    deleteUser(inUserId){
        const userListPosition = this.userList.findIndex(({ id }) => id == inUserId)
        console.log(userListPosition)
        const savedDeletedUser = {... this.findUser(inUserId)}
        if(userListPosition >= 0){
            this.userList.splice(userListPosition, 1)
            return savedDeletedUser
        } else {
            console.log("Can not find user to delete.")
            return false
        }
    }

    findUser(inUserId){
        const user = this.userList.find(({ id }) => id == inUserId)
        return user
    }

    findEmail(inEmail){
        const user = this.userList.find(({ email }) => email == inEmail)
        return user
    }

    getNewUserId(){
        if(!this.userList.length){
            this.userIdCounter = 0
        } else{
            for (const user of this.userList) {
                if(user.id > this.userIdCounter){
                    this.userIdCounter = user.id
                }
            }
        }
        console.log("from get user new id")
        console.log(this.userIdCounter)
        return this.userIdCounter + 1
    }

    loadUserList(){
        //if file does not exist load userList and save it.
        //else load userList from file.
        console.log("from json read")
        const data = this.fs.readFileSync('./userList.json', 'utf8')
        const jsonData = JSON.parse(data)
        console.log(jsonData)

    }

    saveUserList(){
        //save userList to file.
    }
}

module.exports = Users