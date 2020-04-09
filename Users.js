class Users{
    constructor(){
        this.userList = [
            {
                name: "alex",
                userId: 1
            },
            {
                name: "rex",
                userId: 2
            }
        ]
    }

    getUserList(){
        return this.userList
    }
}

module.exports = Users