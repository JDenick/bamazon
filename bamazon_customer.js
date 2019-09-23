// Packages used for customer app
var mysql = require("mysql");
var inquirer = require("inquirer");

// Created connection for mysql w/ appropriate data
var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user: "root",
    password: "mysql2424",
    database: "bamazon"
})

// Connection function to dispaly table / throw error if needed
connection.connect(function(err){
    if (err) throw err;
    console.log("connection successful");
    displayTable();
})

// Created function to create table from mysql and also run customer choice function
var displayTable = function(){
    connection.query("SELECT * FROM products", function(err, res){
        for(var i=0; i<res.length; i++){
            console.log(
                "Item Number: " + res[i].itemId + "\n" +
                "Item: " + res[i].productName + "\n" +
                "Department Name: " + res[i].departmentName + "\n" + 
                "Price: " + res[i].price + "\n" +
                "Quantity: " + res[i].stockQuantity + "\n" +
                "*********************************");
        }
       customerChoice(res);
    })
}

// Created function to ask customer what they want to buy & how many they would like to buy 
// After answers are provided via inquirer, function returns to a review of what was purchased / amount that was purchaed in addition to updated data 
// Will return error message if item is entered incorrectly by user / invalid inventory 
var customerChoice = function(res){
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "Return to main menu by entering M \n What would you like to purchase?"
    }]).then(function(answer){
        var correct = false;
        if(answer.choice.toUpperCase()==="M"){
            process.exit();
        }
        for(var i=0; i<res.length; i++){
            if(res[i].productName==answer.choice){
                correct=true;
                var product=answer.choice;
                var id=i;
                inquirer.prompt({
                    type: "input",
                    name: "Quantity",
                    message: "How many would you like to buy?",
                    validate: function(value){
                            if(isNaN(value)==false){
                                return true;
                            } else {
                                return false;
                            } 
                        }
                    }).then(function(answer){
                        if((res[id].stockQuantity-answer.Quantity)>0){
                            connection.query("UPDATE products SET stockQuantity='"+(res[id].stockQuantity-
                            answer.Quantity)+"' WHERE productName='"+product
                            +"'", function(err, res2){
                            displayTable();
                            console.log("======================");
                            console.log("DATA HAS BEEN UPDATED:");
                            console.log("Thank you! Your order of " + answer.Quantity + " " + product + " has been ordered!");
                            console.log("Your final total is: $" + answer.Quantity*(res[id].price));
                            console.log("======================");
                        })
                    } else {
                        console.log("==================")
                        console.log("Insufficient Inventory, please select another choice!");
                        console.log("==================")
                        displayTable(res);
                    }
                })
            }
        } 
        if(i==res.length && correct==false){
            console.log("==================")
            console.log("Not a valid selection, please select another choice!");
            console.log("==================")
            displayTable(res);
        }
    })
}
        

        