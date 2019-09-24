Please use the snapshots to go along w/ readme_manager.md file

-- Manager 1: --
First part of the main code that holds packages used, connection to mysql, and function that displays the table which holds inventory data.


-- Manager 2: --
This part of the code holds the inquirer prompt to ask user inital question if they want to add an item to data or if they would like to adjust quantity of an item already in the data.


-- Manager 3: --
This part of the code holds the addItem function. When selected, this function will ask the user: 
- What product would you like to add?
- Which dept. will product be in?
- What is the price?
- How many items will be available to sell?


-- Manager 4: --
This part of the code holds the addQuantity fucntion. Once selected, this function will ask the user:
- Which product would you like to update (the user must enter a valid choice, otherwise, the user will not be able to update a quantity of a product and will be prompted to make another selection).
- How much stock would you like to add? 


-- Manager 5: --
Shows the regular set of data that would be loaded. 


-- Manager 6: --
This shows what happens with the Add a new item selection is entered. In this example, the inventory which was added was a Baseball Glove. We then entered in into the baseball department, set the price for 39.95, and also made 30 available for sale. Once everything was entered, the data set updated (pictured at the bottom of the table) with the Baseball Glove data entered.


-- Manager 7: --
This shows what happens with the Add Quantity selection is entered. in this example, The quantity which is being updated is Hockey Tape. The current quantity is set at 45. We added five rolls of hockey tape which then shows the data updated with 50. 


