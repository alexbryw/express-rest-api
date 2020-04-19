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
    ulEl.classList.add("list-group")
    console.log(userList)
    if(userList.length){
        for (const user of userList) {
            let liEl = document.createElement("li")
            liEl.classList.add("list-group-item")
            liEl.innerText = user.name + " " + user.email + " " + user.id + " " + user.country
            ulEl.appendChild(liEl)
        }
        userListContainer.append(ulEl)
    }
}

async function addNewUser(){
    const newUserNameInEl = document.getElementById("newUserNameIn")
    const newUserMailInEl = document.getElementById("newUserMailIn")
    const newUserCountryInEl = document.getElementById("newUserCountryIn")

    const url ="/api/users"
    console.log("add new user..")
    const newUser = {
        name: newUserNameInEl.value,
        email: newUserMailInEl.value,
        country: newUserCountryInEl.value
    }
    const dataBack = await sendToAPI(url ,"post", newUser)
    console.log(dataBack)
}

async function updateUser(){
    const updateIdInEl = document.getElementById("updateIdIn")
    const updateNameInEl = document.getElementById("updateNameIn")
    const updateMailInEl = document.getElementById("updateMailIn")
    const updateCountryInEl = document.getElementById("updateCountryIn")
    const url = "/api/users/" + updateIdInEl.value
    console.log(url)
    const updatedUser = {
        name: updateNameInEl.value,
        email: updateMailInEl.value,
        country: updateCountryInEl.value
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