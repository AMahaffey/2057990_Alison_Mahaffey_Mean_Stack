// load the modules
let mongoose = require("mongoose");
let express = require("express");
let bodyParser = require("body-parser");
let app = express();
// url
let url="mongodb://localhost:27017/schoolserver";

// avoid lower case collection creation
mongoose.pluralize(null);
mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err));

app.listen(9090,()=>console.log("Server running on port number 9090"));
let db = mongoose.connection;

db.once("open",()=> {
    // We have to defined schema which provide the structure for collection 
    let courseSchema = mongoose.Schema({
        _id:Number,
        cname:String,
        description:String,
        amt:Number
    });

    // using schema we have to create the model 
    //1st parameter collection name and 2nd parameter schema reference
    // mongoose intenrally create collection name in lower case 
    // with post fix s.
    let courseModel = mongoose.model("Course",courseSchema);
    // mongoose.disconnect;

    app.use(bodyParser.urlencoded({extended:true}));

    app.get("/",(request,response)=> {
        response.sendFile(__dirname+"\\index.html");
    })
    app.get("/addcourse",(request,response)=> {
        response.sendFile(__dirname+"\\addCourse.html");
    })
    app.get("/deletecourse",(request,response)=> {
        response.sendFile(__dirname+"\\deleteCourse.html");
    })
    app.get("/updatecourse",(request,response)=> {
        response.sendFile(__dirname+"\\updateCourse.html");
    })
    app.get("/findcourse",(request,response)=> {
        let start = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="app.js"></script>
            <title>Find Course</title>
        </head>
        <body>
            <h2>Course List</h2>
            <div>`;
        let inner = ``;
        let end = `                
            </div>
            <a href="/">Back</a>
        </body>
        </html>`;
        courseModel.find({},(err,doc)=> {
            if(!err){
                doc.forEach(rec=> {
                    inner = inner+`<p style='background-color:grey'>
                    <label>ID: </label>`+rec._id+
                    `<label>Name: </label>`+rec.cname +
                    `<label>Description: </label>`+rec.description+
                    `<label>Amount: </label>`+rec.amt+`</p>`;
                    let page = start+inner+end;
                })
            }else {
                console.log(err);
            }
            response.send(start+inner+end);
        })

    })

    app.post("/add",(request,response)=> {
        let courseDetails = request.body;
        console.log(courseDetails);
        let c = new courseModel({_id:courseDetails.courseID,
                                cname:courseDetails.courseName,
                                description: courseDetails.description,
                                amt:courseDetails.amount
                                });
        courseModel.create([c],(err,result)=> {
            if(!err){
                console.log(result);
            }else {
                console.log(err);
            }
        })
        response.sendFile(__dirname+"\\addCourse.html");
    })

    app.post("/update",(request,response)=> {
        let courseDetails = request.body;
        courseModel.updateOne({_id:courseDetails.courseID},{$set:{amt:courseDetails.amount}},(err,result)=> {
            if(!err){
                if(result.modifiedCount>0 || result.matchedCount >0){
                    console.log("Course amount updated succesfully");
                }else {
                    console.log("Course amount didn't update");
                }
            }else{
                console.log(err);
            }
]        })
        console.log(courseDetails);
        response.sendFile(__dirname+"\\updateCourse.html");
    })

    app.post("/delete",(request,response)=> {
        let courseDetails = request.body;
        console.log(courseDetails);
        courseModel.deleteMany({_id:{$eq:courseDetails.courseID}},(err,result) => {
            if(!err){
                if(result.deletedCount>0){
                    console.log("Record deleted successfully");
                }else {
                        console.log("Record not present");
                }
            }else{
                console.log(err);
            }
        })
        response.sendFile(__dirname+"\\deleteCourse.html");
    })

    mongoose.disconnect;
})

