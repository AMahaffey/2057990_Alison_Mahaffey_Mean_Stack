let mongoClient = require("mongodb").MongoClient;
let fs = require("fs");

let url ="mongodb://localhost:27017";
// connect the database 
mongoClient.connect(url,(err,client)=> {
    if(!err){
        console.log("Connected")
        let db = client.db("CallLog");
        let calls = JSON.parse(fs.readFileSync("call_data.json").toString());
        db.collection("Calls").insertMany(calls,(err,result)=> {
            if(!err){
                console.log("Record inserted successfully")
                console.log(result);
            }else {
                console.log(err);
            }
            client.close();
        })
    }else {
        console.log(err);
    }
})