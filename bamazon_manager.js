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
var displayTable = function(){
    connection.query("Select * FROM products", function(err, res){
        if (err) throw err;
        console.log("ItemID\nProduct Name\nDepartment Name\nPrice\nNumber in Stock");
        console.log("================");
        for(var i=0; i<res.length; i++){
            console.log(
            "Item Number: " + res[i].itemId + "\n" +
            "Item: " + res[i].productName + "\n" +
            "Department Name: " + res[i].departmentName + "\n" + 
            "Price: " + res[i].price + "\n" +
            "Quantity: " + res[i].stockQuantity + "\n" +
            "*********************************");
        }
        promptMGMT(res);
    })
}

var promptMGMT = function(res) {
    inquirer.prompt([{
        type: "rawlist",
        name: "choice",
        message: "What would you like to do?",
        choices: ["Add a new item", "Add quantity to an existing item"]
    }]).then(function(val){
        if(val.choice=="Add a new item"){
            addItem();
        }
        if(val.choice=="Add quantity to an existing item"){
            addQuantity(res);
        }
    })
}

function addItem(){
    inquirer.prompt([{
        type: "input",
        name: "productName",
        message: "What product are you going to add?"
    },{
       type: "input",
       name: "departmentName",
       message: "Which department will product be categorized in?"
    },{
        type: "input",
        name: "price",
        message: "What is the price of each individual item?"
    },{
        type: "input",
        name: "quantity",
        message: "How many items are available for sale?"
    }]).then(function(val){
        connection.query("INSERT INTO products (productName, departmentName, price, stockQuantity) VALUES ('"+val.productName+"','"+val.departmentName+"',"+val.price+","+val.quantity+");", function(err,res){
                if(err)throw err;
                console.log(val.productName+ " Added to Bamazon!");
                displayTable();
            })
    })
}

function addQuantity(res){
    inquirer.prompt([{
        type: "input",
        name: "productName",
        message: "Which product would you like to update?"
    },{
        type: "input",
        name: "additions",
        message: "How much stock would you like to add?"
    }]).then(function(val){
        for(i=0; i<res.length; i++){
            if(res[i].productName==val.productName){
                connection.query('UPDATE products SET stockQuantity=stockQuantity+'+val.added+' WHERE itemId='+res[i].itemId+';', function(err,res){
                    if(err)throw err;
                    if(res.affectedRows == 0){
                        console.log("That item does not exist at thsi time. Try selecting a different item.");
                        displayTable();
                    } else {
                        console.log("Inventory has been modified!");
                        displayTable();
                    }
                })
            }
        }
    })
}

displayTable();
