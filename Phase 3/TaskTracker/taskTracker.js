let http = require("http");
let url = require("url");
let fs = require("fs");
let tasks = [];
let indexStart=`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        <style>
            table, th, td {
                border:1px solid black;
            }
            label {
                display:inline-block;
                width: 100px;
                text-align:right;
            }
            input {
                width: 150px;
                color:blue;
            }
        </style>
    </head>
    <body>
        <h2>Task Planner</h2>

        <div>
        <form action="registerTask">
            <label>Employee ID </label>
            <input type="number" name="empID" required/><br/>

            <label>Task ID </label>
            <input type="number" name="taskID" required/><br/>

            <label>Task </label>
            <input type="text" name="task" required/><br/>

            <label>Deadline </label>
            <input type="date" name="due" required/><br/>

            <input type="submit" value="Add Task"/>
            <input type="reset" value="Clear Fields"/> 
         </form><br/><br/>

         <form action="deleteTask">
            <label>Task ID </label>
            <input type = "text" name="taskID"/>
            <input type = "submit" value="Delete Task"/><br/>
         </form>
         </div><br/>

        <div>
        <h3>List Task</h3>
            <table id="taskTable">
                <tr id="taskTblHeader">
                    <th> Employee ID </th> 
                    <th> Task ID </th>
                    <th> Task </th>
                    <th> Deadline </th>
                </tr>
            `
let innerIndex = ``;
let indexEnd=`
            </table>
        </div>
    </body>
</html>
`
let server = http.createServer((request,response)=>{
    let urlInfo = url.parse(request.url, true);
    if(urlInfo.path != "/favicon.ico"){
        if(urlInfo.path == '/index'){
            // if JSON file has data then load it into array
            if(!isEmpty("tasks.json")){
                tasks = JSON.parse(fs.readFileSync("tasks.json").toString());
            }
            innerIndex=displayRows(tasks);
            response.write(indexStart+innerIndex+indexEnd);
        }
        else if(urlInfo.pathname == "/registerTask"){
            tasks=[];

            // if JSON file has data then load it into array
            if(!isEmpty("tasks.json")){
                tasks = JSON.parse(fs.readFileSync("tasks.json").toString());
            }
            // get task details
            let taskInfo = urlInfo.query;
            let empID = taskInfo.empID;
            let taskID = taskInfo.taskID;
            let task = taskInfo.task;
            let due = taskInfo.due;
    
            // store task details in newTask object
            if(tasks.find(t=>t.taskID==taskID)==undefined){
                let newTask = {"empID":empID,"taskID":taskID,"task":task,"due":due};
                // add the newTask to task array
                tasks.push(newTask);
                console.log(tasks);
                // write task array contents to json file
                fs.writeFileSync("tasks.json",JSON.stringify(tasks));
                console.log("New task stored");
                // update tasks table with new row
                innerIndex=displayRows(tasks);
            } 
            else{
                console.log("Please choose a unique task ID");
            }
            // display fresh index page
            response.write(indexStart+innerIndex+indexEnd);
        }
        else if(urlInfo.pathname == "/deleteTask"){
            let taskInfo = urlInfo.query;
            let taskID = taskInfo.taskID;
            if (!isEmpty("tasks.json")){
                tasks = JSON.parse(fs.readFileSync("tasks.json").toString());
            } else {
                tasks=[];
                response.write("Cannot delete tasks when the task list is empty.");
            }
            console.log(tasks);

            let result = tasks.findIndex(t=>t.taskID==taskID);
            if (result == -1){
                response.write("There is no task matching this ID to delete");
            }else{
                tasks.splice(result,1);
                console.log("Task ID "+taskID+" was removed from tasks array");
                fs.writeFileSync("tasks.json",JSON.stringify(tasks));
                console.log(tasks);
            }
            response.write(indexStart+innerIndex+indexEnd);
        }
    }
    response.end("<font color='blue'>Welcome to Task Tracker App</font>");
});

function displayRows(tasks){
    let innerIndex = ``;
    tasks.forEach((x)=>{
        let rowContent =`<tr>
                <td>`+x.empID+`</td>
                <td>`+x.taskID+`</td>
                <td>`+x.task+`</td>
                <td>`+x.due+`</td>
            </tr>`;
            innerIndex = innerIndex + rowContent;
    });
    return innerIndex;
}

function isEmpty (file){
    let stats = fs.statSync(file);
    if(stats.size <= 0){
        return true;
    }
    return false;
}

server.listen(9090,()=>console.log("Server is running on port 9090"));