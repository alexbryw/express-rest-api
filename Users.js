class Users{
    constructor(){
        this.userList = [
            {
                name: "alex",
                eMail: "alex@alex.com",
                userId: 1,
                country: "Sweden"
            },
            {
                name: "rex",
                eMail: "rex@rex.com",
                userId: 2,
                country: "Belgium"
            }
        ]
    }

    getUserList(){
        return this.userList
    }

    addUser(name, eMail, userID, country){
        this.userList.push({name: name, eMail: eMail, userID: userID, country: country})
    }

    updateUserEmail(inUserId, nextEmail){
        console.log(inUserId, nextEmail)
        const user = this.userList.find( ({ userId }) => userId === parseInt(inUserId))
        console.log(user)
        if(user){
            user.eMail = nextEmail
        } else{
            console.log("Update info error.")
        }
    }

    deleteUser(inUserId){
        const userListPosition = this.userList.findIndex(({ userId }) => userId === parseInt(inUserId))
        console.log(userListPosition)
        if(userListPosition >= 0){
            this.userList.splice(userListPosition, 1)
        } else {
            console.log("Can not find user to delete.")
        }
    }
}

module.exports = Users