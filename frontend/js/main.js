const socket = io("http://localhost:3000");

let allNotes = [];


socket.on("connect", (x) => { 
    socket.emit("load")
 })

function addNote() {
  let note = {
    name: document.getElementById("noteTitle").value,
    description: document.getElementById("noteDesc").value,
  };

  socket.emit("addNote", note);
}

socket.on("allData", (data) => {
  console.log(data);
  allNotes = data;
  displayData();
});

function displayData() {
  let box = ``;
  for (let i = 0; i < allNotes.length; i++) {
    box += `<div class="col-md-4 mb-5">
            <div class="border bg-white text-dark rounded-3 p-5 text-center">
                <h3>${allNotes[i]['name']}</h3>
                <p>${allNotes[i]['description']}</p>
                <button class="btn btn-danger" onclick="deleteNote('${allNotes[i]._id}')">Delete</button>

            </div>
        </div>`;
  }

  document.getElementById("rows").innerHTML = box;
}


function deleteNote(id) {
 console.log(id)
 socket.emit("deleteNote", id);
}

// const myInput = document.getElementById("chatMsg");
// function sendMsg() {
//   let message = document.getElementById("chatMsg");
//   console.log(message.value);
//   socket.emit("newMessage", message.value);
//   message.value = "";
// }

// socket.on("replay", (data) => {
//   console.log(data);
//   document.querySelector(
//     "#test"
//   ).innerHTML += `<div class="message_content">${data}</div>`;
// });

// myInput.addEventListener("input", function (e) {
//   console.log(e.target.value);
//   socket.emit("UserTyping", e.target.value);
// });

// myInput.addEventListener("keyup", function (e) {
//   socket.emit("stopTyping", e.target.value);
// });

// socket.on("typing", (data) => {
//   document.getElementById("typingMes").classList.replace("d-none", "d-block");
// });

// socket.on("stopUserTyping", (data) => {
//   setTimeout(() => {
//     document.getElementById("typingMes").classList.replace("d-block", "d-none");
//   }, 1000);
// });
