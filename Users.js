class Users{
    constructor(){
        this.fs = require('fs')
        this.userListPath = "./userList.json"
        this.userList = []
        this.firstUsers = [
            {
                name: "Admin",
                email: "admin@admin.com",
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
        if(this.findEmail(newUserInfo.email)){
            console.log("Provide a unique email.")
            return false
        } else {
            this.userList.push(newUser)
            this.saveUserList()
            return newUser
        }
    }

    updateUserInfo(user, newUserInfo){
        console.log(user, newUserInfo)
        if(newUserInfo.name || newUserInfo.email || newUserInfo.country){
            user.name = newUserInfo.name ? newUserInfo.name : user.name
            user.email = newUserInfo.email ? newUserInfo.email : user.email
            user.country = newUserInfo.country ? newUserInfo.country : user.country
            this.saveUserList()
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
            this.saveUserList()
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
        let highestUserId = 0
        if(this.userList.length){
            for (const user of this.userList) {
                if(user.id > highestUserId){
                    highestUserId = user.id
                }
            }
        }
        console.log("from get user new id")
        console.log(highestUserId)
        return highestUserId + 1
    }

    loadUserList(){
        if(!this.fs.existsSync(this.userListPath)){
            this.userList = this.firstUsers
            this.saveUserList()
            console.log("userList file does not exits, will load first users.")
            return
        }

        try {
            const rawData =  this.fs.readFileSync(this.userListPath, "utf8")
            const parsedData = JSON.parse(rawData)
            this.userList = parsedData
            console.log("userList loaded")

        } catch (error) {
            console.log("Load userList error")
            console.error(error)
        }
    }

    saveUserList(){
        //save userList to file.
        try {
            this.fs.writeFileSync(this.userListPath, JSON.stringify(this.userList))
            console.log("userList saved")
        } catch (error) {
            console.log("save userList error")
            console.error(error)
        }
    }
}

module.exports = Users