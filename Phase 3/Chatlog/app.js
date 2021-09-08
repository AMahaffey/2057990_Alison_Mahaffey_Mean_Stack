// load the modules
let express=require("express");
let app = express();

let bodyParser = require("body-parser");

let mongoose=require("mongoose");

let http = require("http").Server(app);
let io = require('socket.io')(http);

// url details
let url = "mongodb://localhost:27017/chatlog";
// include uppercases and remove (+s)
mongoose.pluralize(null);

mongoose.connect(url).
then(res=>console.log("connected to DB")).
catch(err=>console.log(err));

let db = mongoose.connection;
// let index = 0;
db.once("open",()=> {
    let chatSchema = mongoose.Schema({
        _id:Number,
        name:String,
        mssg:String
    });

    let chatModel = mongoose.model("SentMssgs",chatSchema);

    app.use(bodyParser.urlencoded({extended:true}));
    app.get("/",(req,res)=> {
        res.sendFile(__dirname+"\\index.html");
    })

    
    // function getID(){
    //     let index = 0;
    //     chatModel.find({},(err,doc)=> {
    //         if(!err){
    //             doc.forEach(rec=> {
    //                 let high = 0;
    //                 if(rec._id>high){
    //                     high = rec._id + 1;
    //                 }
    //                 index = high;
    //                 console.log("Inside of getID > doc.forEach: high="+high);
    //                 console.log("And index = "+index);
    //             })
    //         }else{
    //             console.log(err);
    //         }
    //         let pause = true;

    //     })
    // }
    
    io.on("connection",(socket)=> {
        console.log("Client connected");
        let clName="";
        let clMssg="";

        socket.on("name",(name)=> {
            clName = name;
        })
        socket.on("mssg",(mssg)=> {
            clMssg = mssg;
            
            let index = 0;
            chatModel.findOne({},'_id').sort({_id:-1}).limit(1).then((res,err)=>{
            if(!err){
                let index = res._id+ 1;
                let chat = new chatModel({  _id: index,
                                            name: clName,
                                            mssg: clMssg
                                        });
            chatModel.create([chat],(err,result)=> {
                if(!err){
                    console.log(result);
                }else{
                    console.log(err);
                }
            })
            }else{
                console.log(err);
            }})

        })
    })

    http.listen(9090,()=>console.log("Server running on port number 9090"));
}) // end of open db