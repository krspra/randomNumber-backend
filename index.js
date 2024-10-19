const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Defining the WebSocket server
const app = express();
const ourServer = http.createServer(app);
const io = new Server(ourServer, {
  cors: {
    origin: "https://randomnum-frontend.vercel.app/",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// Managing CORS
app.use(cors());

// Starting the server
const PORT=process.env.PORT|| 3000
ourServer.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});

// Working with WebSocket-----------------------------------------

let minVal = 1;
let maxVal = 100;


io.on('connection', (socket) => {

  socket.on('minVal', (newMinVal) => {
    minVal = Number(newMinVal);
});

socket.on('maxVal', (newMaxVal) => {
    maxVal = Number(newMaxVal); 
});


});

// Creating a random number supply chain
setInterval(() => {
  const randomNumber = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
  
  io.emit("randomNumber", randomNumber);
}, 1100);

