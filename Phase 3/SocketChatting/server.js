// load the express module 
let express = require("express");

// create the reference of epxress module 
let app = express();

// load the http module and connect to express module with Server property
let http = require("http").Server(app);

// load the socket.io module and connect http module 
// with IIFE features 
let io = require('socket.io')(http);

let replies = [{q: "how are you?", r: "I am well, thanks!"},
            {q: "what is your favorite color?", r: "My favorite color is yellow"},
            {q: "what is your name?", r: "My name is ChatBot!"},
            {q: "what are your hobbies?", r: "Helping people!"},
            {q: "5+5", r: "10 :)"}];

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"\\client.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected");
    let clientName = "";
    let greetingFlag = 0;
    socket.emit("welcome", "Feel free to message me with any questions!");
    // let question = "";
    // receive the message from client application 
    socket.on("name",(name)=> {
        console.log('client name: ',name);
        clientName = name
        //  // sending data to client 
        if (greetingFlag == 0){
            socket.emit("greeting","Hi "+name+"!");
            greetingFlag = 1;
        }
    })
    socket.on("question",(q)=> {
        console.log('client question: ',q);

         // sending data to client 
        let index = replies.findIndex(r=>r.q==q.toLowerCase());
        if(index == -1){
            socket.emit("reply",clientName+", You asked "+q+" but I don't know the answer... Try a different question!");
        }
        else{
            socket.emit("reply", replies[index].r);
        }
    })
})


// please run the server using http module not express module 
http.listen(9090,()=>console.log("Server running on port number 9090"));

// let express = require("express");
// let app = express();

// let http = require("http").Server(app);

// let io = require('socket.io')(http);

// let readline = require("readline");
// let r1 = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// })


// app.get("/",(req,res)=> {
//     res.sendFile(__dirname+"\\client.html");
// })

// io.on("connection",(socket)=>{
//     console.log("Client connected");
//     socket.on("obj",(msg)=> {
//         console.log(msg);
//     })

//     socket.emit("obj1","Hello Client connected server...");
// })
//     http.listen(9090,()=>console.log("Server running on port number 9090"));
