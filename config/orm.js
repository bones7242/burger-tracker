var connection = require("./connection.js");

// helper function to wrap multiple words in single quotes for sqlQuery
function wrapInQuotes(unwrappedString){
    var wrappedString = "'" + unwrappedString + "'";
    return wrappedString;
}

var orm = {
    // method to select all froma table 
    selectAll: function(tableName, modelCallback){
        //build the query
        var sqlQuery = "SELECT * FROM " + tableName; //why can't i do this using the ?s in the connection.query?
        //make the query 
        connection.query(sqlQuery, function(error, result){  //don't use select * in production
            if (error) {
                console.log("an error occured with selectAll:", error);
                return;
            }
            modelCallback(result);
        });
    },
    // method to add one row to a table based on one colum 
    insertOne: function(tableName, column, entry, modelCallback){
        // build the query
        var sqlQuery = "INSERT INTO " + tableName + " (" + column + ") ";
        sqlQuery += "VALUES" + " (" + wrapInQuotes(entry) + "); ";
        console.log(sqlQuery);
        // make the query 
        connection.query(sqlQuery, function(error, result){
            if (error) {
                console.log("an error occured with insertOne:", error);
                return;
            }
            modelCallback(result);
        })
    },
    // method to update one entry 
    updateOne: function(tableName, column, entry, updateColumn, updateEntry, modelCallback){
        // build the query
        var sqlQuery = "UPDATE " + tableName + " ";
        sqlQuery += "SET " + updateColumn + " = " + updateEntry +" ";
        sqlQuery += "WHERE " + column + " = " + entry + ";";
        console.log(sqlQuery);
        // make the query 
        connection.query(sqlQuery, function(error, data){
            if (error) {
                console.log("an error occured with updateOne:", error);
                return;
            }
            modelCallback(data);
        })
    }
};

module.exports = orm;


