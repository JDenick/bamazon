var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user: "root",
    password: "mysql2424",
    database: "bamazon"
})

connection.connect(function(err){
    if (err) throw err;
    console.log("connection successful");
    displayTable();
})

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
                            console.log("DATA HAS BEEN UPDATED:")
                            displayTable();
                            console.log("Congratulations, product has been purchased!");
                        })
                    } else {
                        console.log("Not a valid Selection, please select another choice!");
                        displayChoice(res);
                    }
                })
            }
        } 
        if(i==res.length && correct==false){
            console.log("Not a valid selection!");
            customerChoice(res);
        }
    })
}
        

        