class Users{
    constructor(){
        this.userList = [
            {
                name: "Alex",
                email: "alex@alex.com",
                userId: 1,
                country: "Sweden"
            },
            {
                name: "Rex",
                email: "rex@rex.com",
                userId: 2,
                country: "Belgium"
            }
        ]
    }

    getUserList(){
        return this.userList
    }

    addUser(newUserInfo){
        const newUser = {
            name: newUserInfo.name,
            email: newUserInfo.email,
            userId: newUserInfo.userID,
            country: newUserInfo.country ? newUserInfo.country : ""
        }
        console.log("from add new user")
        console.log(newUser)
        if(this.findUser(newUserInfo.userID) || this.findEmail(newUserInfo.email)){
            console.log("Provide a unique userID number and a unique email.")
            return false
        } else {
            this.userList.push(newUser)
            return true
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
        const userListPosition = this.userList.findIndex(({ userId }) => userId == inUserId)
        console.log(userListPosition)
        if(userListPosition >= 0){
            this.userList.splice(userListPosition, 1)
            return true
        } else {
            console.log("Can not find user to delete.")
            return false
        }
    }

    findUser(inUserId){
        const user = this.userList.find(({userId}) => userId == inUserId)
        return user
    }

    findEmail(inEmail){
        const user = this.userList.find(({ email }) => email == inEmail)
        return user
    }
}

module.exports = Users