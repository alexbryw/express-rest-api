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
    if(userList.length){
        for (const user of userList) {
            let liEl = document.createElement("li")
            liEl.classList.add("list-group-item")
            liEl.innerHTML = 
            "Name: " + user.name + "<br>" + "Email: " + user.email + "<br>" + "id: " + user.id + "<br>" + "Country: " + user.country
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
    const newUser = {
        name: newUserNameInEl.value,
        email: newUserMailInEl.value,
        country: newUserCountryInEl.value
    }
    const dataBack = await sendToAPI(url ,"post", newUser)
}

async function updateUser(){
    const updateIdInEl = document.getElementById("updateIdIn")
    const updateNameInEl = document.getElementById("updateNameIn")
    const updateMailInEl = document.getElementById("updateMailIn")
    const updateCountryInEl = document.getElementById("updateCountryIn")
    if(updateIdInEl.value && updateNameInEl.value && updateMailInEl.value){
        const url = "/api/users/" + updateIdInEl.value
        const updatedUser = {
            name: updateNameInEl.value,
            email: updateMailInEl.value,
            country: updateCountryInEl.value
        }
        const dataBack = await sendToAPI(url, "put", updatedUser)
    }

}

async function deleteUser(){
    const deleteUserInEl = document.getElementById("deleteUserIn")
    if(deleteUserInEl.value){
        const url = "/api/users/" + deleteUserInEl.value
        const dataBack = await sendToAPI(url, "delete")
    }
}

async function getUserById(){
    const getUserIdInEl = document.getElementById("getUserIdIn")
    const oneUserContainerEl = document.querySelector(".oneUserContainer")
    oneUserContainerEl.innerHTML = ""
    let ulEl = document.createElement("ul")
    ulEl.classList.add("list-group")
    if(getUserIdInEl.value){
        const url = "/api/users/" + getUserIdInEl.value
        const user = await sendToAPI(url, "get")
        if(user.name){
            let liEl = document.createElement("li")
            liEl.classList.add("list-group-item")
            liEl.innerHTML = 
            "Name: " + user.name + "<br>" + "Email: " + user.email + "<br>" + "id: " + user.id + "<br>" + "Country: " + user.country
            ulEl.appendChild(liEl)
            oneUserContainerEl.append(ulEl)
        }
    }
}

async function sendToAPI(url, method, sendData){
    const response = await fetch(url,{
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
    })
    const data = await response.json()
    return data

}