//readline-sync: takes value through keyboard synch
// globally install using npm install readline sync -g 
// use npm init to create a package.json filelet readline= require("readline-sync");

let readline = require("readline-sync");
let fs = require("fs");

let getFirstName = readline.question("Enter your first name");
let getLastName = readline.question("Enter your last name");
let getGender = readline.question("Enter your gender");
let getEmail = readline.questionEMail("Enter your email");
let entryDate = Date();
debugger;

let user = {first: getFirstName, last: getLastName, gender: getGender, email: getEmail, timeofEntry: entryDate};
let userlog = JSON.parse(fs.readFileSync("user-log.json").toString());
userlog.push(user);
console.log(userlog);
debugger;

fs.writeFileSync("user-log.json",JSON.stringify(userlog));
console.log("New user log stored")
debugger;
