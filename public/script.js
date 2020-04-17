window.onload = addEventListeners

function addEventListeners(){
    const userListBtn = document.querySelector('.userListBtn')
    const newUserBtn = document.querySelector('.newUserBtn')
    const updateUserBtn = document.querySelector('.updateUserBtn')
    const deleteUserBtn = document.querySelector('.deleteUserBtn')
    const userByIdBtn = document.querySelector('.userByIdBtn')
    userListBtn.addEventListener("click", getUserList)
    newUserBtn.addEventListener("click", addNewUser)
    updateUserBtn.addEventListener("click", updateUser)
    deleteUserBtn.addEventListener("click", deleteUser)
    userByIdBtn.addEventListener("click", getUserById)
    console.log("add events running..")
}

async function getUserList(event){
    console.log("btn clicked")
    try {
        let response = await fetch('/api/users')
        let userList = await response.json()
        console.log(userList)
        showUserList(userList)
    } catch (error) {
        console.log("Can not connect to server")
    }
}

function showUserList(userList){
    let userListContainer = document.querySelector(".userListContainer")
    userListContainer.innerHTML = ""
    let ulEl = document.createElement("ul")
    console.log(userList)
    if(userList.length){
        for (const user of userList) {
            let liEl = document.createElement("li")
            liEl.innerText = user.name + " " + user.email + " " + user.id + " " + user.country
            ulEl.appendChild(liEl)
        }
        userListContainer.append(ulEl)
    }
}

async function addNewUser(){
    const url ="/api/users"
    console.log("add new user..")
    const newUser = {
        name: "Web Person",
        email: "web@web.com",
        country: "Switzerland"
    }
    const dataBack = await sendToAPI(url ,"post", newUser)
    console.log(dataBack)
}

async function updateUser(){
    const url = "/api/users/3"
    const updatedUser = {
        name: "updated name",
        email: "updated@mail.com",
        country: "Uppland"
    }
    const dataBack = await sendToAPI(url, "put", updatedUser)
    console.log(dataBack)

}

async function deleteUser(){
    const url = "/api/users/3"
    const dataBack = await sendToAPI(url, "delete")
    console.log(dataBack)
}

async function getUserById(){
    const url = "/api/users/2"
    const dataBack = await sendToAPI(url, "get")
    console.log(dataBack)
}

async function sendToAPI(url, method, sendData){
    const response = await fetch(url,{
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
    })
    const data2 = await response.json()
    console.log(data2)
    // if(data2.msg){
    //     alert(data2.msg)
    // }
    return data2

}