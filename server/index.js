const express = require("express");
const http = require("http")
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app)
const PORT = 8000
const io = socketio(server)
const router = require("./router/routes")
app.use(router);
io.on("connection", (socket)=>{
    console.log("connection successful")
    socket.on("disconnect", ()=>{
        console.log("disconnection successful")
    })
})

server.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
})