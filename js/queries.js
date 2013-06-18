//2. query db and view update

// event handler start with on*
function onUpdate(){
    var id = document.itemForm.id.value;
    var amount = document.itemForm.amount.value;
    var name = document.itemForm.name.value;
    if (amount == "" || name == "") {
        updateStatus("'AppUserID' and 'AppUserName' are required fields!");
    }
    else {
        var query = "UPDATE Users SET AppUserID=?, AppUserName=? WHERE ID=?;";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [amount, name, id], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Error: No rows affected");
                    }
                    else {
                        updateForm("", "", "");
                        updateStatus("Updated rows:" + results.rowsAffected);
                        queryAndUpdateOverview();
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Error: Unable to perform an UPDATE " + e + ".");
        }
    }
}

function onDelete(){
    var id = document.itemForm.id.value;
    
    var query = "DELETE FROM Users WHERE ID=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Error: No rows affected.");
                }
                else {
                    updateForm("", "", "");
                    updateStatus("Deleted rows:" + results.rowsAffected);
                    queryAndUpdateOverview();
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to perform an DELETE " + e + ".");
    }
    
}

function onCreate(){
    var amount = document.itemForm.amount.value;
    var name = document.itemForm.name.value;
    if (amount == "" || name == "") {
        updateStatus("Error: 'AppUserID' and 'AppUserName' are required fields!");
    }
    else {
        var query = "INSERT INTO Users (AppUserID, AppUserName, AppUserPassword) VALUES (?, ?, '123');";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [amount, name], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Error: No rows affected.");
                    }
                    else {
                        updateForm("", "", "");
                        updateStatus("Inserted row with id " + results.insertId);
                        queryAndUpdateOverview();
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Error: Unable to perform an INSERT " + e + ".");
        }
    }
}

function onSelect(htmlLIElement){
	var id = htmlLIElement.getAttribute("id");
	
	query = "SELECT * FROM Users where ID=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm(row['ID'], row['AppUserID'], row['AppUserName']);
                
            }, function(transaction, error){
                updateStatus("Error: " + error.code + "<br>Message: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to select data from the db " + e + ".");
    }
   
}

function queryAndUpdateOverview(){
	//remove old table rows
    var dataRows = document.getElementById("itemData").getElementsByClassName("data");
	
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("itemData").removeChild(row);
    };
    
	//read db data and create new table rows
    var query = "SELECT * FROM Users;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
					li.setAttribute("id", row['ID']);
                    li.setAttribute("class", "data");
                    li.setAttribute("onclick", "onSelect(this)");
                    
                    var liText = document.createTextNode(row['AppUserID'] + " x "+ row['AppUserName']);
                    li.appendChild(liText);
                    
                    document.getElementById("itemData").appendChild(li);
                }
            }, function(transaction, error){
               updateStatus("Error: " + error.code + "<br>Message: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to select data from the db " + e + ".");
    }
}