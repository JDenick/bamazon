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
        console.log("ItemID\tProduct Name\tDepartment Name\tPrice\tNumber in Stock");
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
    }
)}

displayTable();
