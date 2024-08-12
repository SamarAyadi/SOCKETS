import express from "express";
import dbConnection from "./database/dbConnections.js";

import { Server } from "socket.io";
import { noteModel } from "./models/note.model.js";
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

dbConnection();
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

const io = new Server(server, {
  cors: "*",
});
io.on("connection", (socket) => {

    socket.on("addNote", async(data) => { 
        console.log(data)
        await noteModel.insertMany(data)
        let allNotes = await noteModel.find({});
        socket.emit("allData", allNotes)
    })

    socket.on("load", async() => { 
        let allNotes = await noteModel.find({});
        socket.emit("allData", allNotes)
     })

     socket.on("deleteNote", async(data) => { 
        await noteModel.findByIdAndDelete(data)
        let allNotes = await noteModel.find({});
        console.log(allNotes)
        socket.emit("allData", allNotes)
     })

     
})


// io.on("connection", (socket) => {
//   console.log("welcome from sockets",socket.id);
//   socket.on("disconnect", () => { 
//     console.log("user disconnected");
//    })
//    socket.on("newMessage", data => { 
//     console.log(data)
//     socket.broadcast.emit("replay", data)
//     })


//     socket.on("UserTyping", (data) => { 
//         console.log('typing')
//         socket.broadcast.emit("typing", "typing")
//      })

//      socket.on("stopTyping", (data) => { 
//         console.log('stopTyping')
//         socket.broadcast.emit("stopUserTyping", "")
//      })
// });
