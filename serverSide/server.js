const express = require('express');
//const helmet = require('helmet');//security features provided
const http = require('http');
const {Server} = require("socket.io");
const cors = require("cors");
const app = express();

app.use(cors());//middleware
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods:["GET","POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("send_message", (data) => {
        //console.log(data);
        //another event
        socket.broadcast.emit("receive_message", data);
    });
});

//start the server
server.listen(8080, () => {
    console.log("Server is Running...");
});




/*const socketio = require('socket.io');

var messages = [];
const app = express();

//middleware
app.use(helmet());

const httpServer = http.Server(app);

const io = socketio(httpServer);

app.get("/", (req, res) => {
    res.sendFile(__dirname, '/index.html')
});

app.use('/assets', express.static('assets'));

io.on('connection', (socket) =>{
    //console.log("someone connected...");
    messages.forEach(message => {//sending all messages
        socket.emit('message', message.name, message.msg);
    });

    socket.on('message', (name,msg) =>{//custom event
        messages.push({name: name, msg: msg});
        socket.broadcast.emit('message', name, msg);
    });
});

httpServer.listen(8080, () => {
    console.log("Server started and listening on port 8080");
})*/