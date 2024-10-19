const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Defining the WebSocket server
const app = express();
const ourServer = http.createServer(app);
const io = new Server(ourServer, {
  cors: {
    origin: "http://localhost:5173", // Adjust this based on your client URL
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// Managing CORS
app.use(cors());

// Starting the server
ourServer.listen(3000, () => {
  console.log("Server started at http://localhost:3000/");
});

// Working with WebSocket-----------------------------------------

let minVal = 1;
let maxVal = 100;


io.on('connection', (socket) => {

  socket.on('minVal', (newMinVal) => {
    minVal = Number(newMinVal);  // Ensure the value is a number
});

socket.on('maxVal', (newMaxVal) => {
    maxVal = Number(newMaxVal);  // Ensure the value is a number
});


});

// Creating a random number supply chain
setInterval(() => {
  console.log("minVal:", minVal, "maxVal:", maxVal);
  const randomNumber = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
  console.log(randomNumber);
  
  io.emit("randomNumber", randomNumber);
}, 1100);

