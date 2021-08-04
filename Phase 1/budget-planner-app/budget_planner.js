// tracks how many budgets are in the stored array
var arraySize = 0;

// called by project_managers page - a function to collect and store user input
function storeBudget(){
    let data1 = document.getElementById("client").value;
    let data2 = document.getElementById("project").value;
    let data3 = document.getElementById("budget").value;

    // create object newBudget to hold the triple values for each budget entered
    let newBudget = {client:data1, project:data2, budget:data3};
    if (sessionStorage.totalBudget){
        // if there is array for budget in storage, load the stored elements from storage
        totalBudget = JSON.parse(sessionStorage.getItem('totalBudget'))
    }
    else {
        // if there is no array for budget in storage yet create it
        totalBudget = [];  
    }
    // append the new budget obj to the budget array and update array size
    totalBudget.push(newBudget);
    arraySize++;
    console.log("Size of array is now "+arraySize);
    sessionStorage.setItem("totalBudget", JSON.stringify(totalBudget));
    console.log("Array "+totalBudget);
}


// function load_table(){
//     console.log("Loading Table Function called");
//     var load_point = document.getElementById(tableBody);

//     for(let i=0;i < arraySize; i++){
//         var new_row = load_point.insertRow(i);
//         let cell_0 = new_row.insertCell(0)
//         cell_0.innerHTM = budgetJson[i].client;
//         let cell_1 = new_row.insertCell(1);
//         cell_1.innerHTM=budgetJson[i].project;
//         let cell_2 = new_row.insertCell(2);
//         cell_2.innerHTM=budgetJson[i].budget;
//     }
    // var new_row = document.createElement("tr");
    // var new_cell = document.createElement("td")
