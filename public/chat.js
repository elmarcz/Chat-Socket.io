if(!socket || socket == undefined){
    const socket = io();   
}

// DOM elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("btn");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

// Send data to server
btn.addEventListener('click', (e) => {
    socket.emit("chat:message", {
        message: message.value,
        username: username.value
    })
})

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value)
})

// Recieve data from server
socket.on('chat:message', (data) => {
    actions.innerHTML = ""
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
})

socket.on('chat:typing', (data) => {
    actions.innerHTML = `<p><em>${data} is typing a message.</em></p>`
})