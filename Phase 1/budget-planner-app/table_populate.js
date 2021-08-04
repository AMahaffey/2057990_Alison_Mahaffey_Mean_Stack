var totalBudget = 0;

function getBudget(){
    console.log("Get budget has been called");
    let budgetObj = sessionStorage.getItem("totalBudget");
    let budgetJson = [];
    budgetJson = JSON.parse(budgetObj);
    arraySize = budgetJson.length;
    // For debugging purposes 
    for (let i = 0; i < arraySize; i++){
    console.log("client "+budgetJson[i].client);
    console.log("project "+budgetJson[i].project); 
    console.log("budget "+budgetJson[i].budget);  
    }

    console.log("Loading Table Function called");
    let table = document.getElementById("myTable");

    for(let i=0;i < arraySize; i++){
        console.log("loop "+i);

        let new_row = table.insertRow(-1);
        new_row.innerHTML = "<td>" + budgetJson[i].client + "</td>" +
        "<td>" + budgetJson[i].project + "</td>" +
        "<td> $" + budgetJson[i].budget + "</td>";
        table.appendChild(new_row);

        totalBudget = totalBudget + Number(budgetJson[i].budget)
        console.log(totalBudget);
     }

     document.write("<h4>Annual Total: $"+totalBudget+"</h4>");
    // var sum = String(totalBudget);
    // var total_content = document.createTextNode("Annual Budget Total: "+sum);
    // document.getElementById("total").appendChild(total_content);
}

getBudget();
