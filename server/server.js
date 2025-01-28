const express = require('express')
const cors = require('cors');
const { Server } = require('socket.io');
const { createServer } = require('http');


const { default: mongoose } = require('mongoose')
const userrouter = require('./routes/users.js')
const newUserModel = require('./models/model.js')
require('dotenv').config();



const app = express()
const server = createServer(app);


const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    }
  });
  
  //middlewares
  app.use(express.json());
  app.use(cors({origin : '*'}));
  app.use('/user',userrouter);
  
  io.on('connection', (socket) => {
    console.log("connection established", socket.id);
    
  
    socket.emit("welcome",socket.id);
    socket.on('send',(e)=>{
      io.sockets.emit('recieve',e);
    })
});
   





mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connected")
   
    server.listen(process.env.PORT, () => console.log(process.env.PORT))
}).catch((e)=>{
    console.log(e);
})