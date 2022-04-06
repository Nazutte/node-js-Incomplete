var mysql = require('mysql');
var util = require('util');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password",
    database: "users"
  });

function connectToDb(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
}

function dbFunc(sql){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Success: " + sql);
        });
      });
}

function showAll(){
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}

function searchDb(data, callback){
    //con.connect(function(err) {
        //if (err) throw err;
        con.query(data, function (err, result) {
          if (err) throw err;
          return callback(data, result)
        });
      //});
}

function ifExists(sql, data){
    if(data == 0){
        console.log(sql + ": doesnt exist");
    }
    else{
        console.log(sql + ": exists");
    }
}

//var sql = "CREATE DATABASE users";
//var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), phonenum VARCHAR(255), email VARCHAR(255), password VARCHAR(255))";
//dbFunc(sql);
//showAll();

var data = new Array();
data.push('Ismail');
data.push('Nazwan');
data.push('9639137');
data.push('test@gmail.com');
data.push('1234');

connectToDb();
//var sql = `SELECT * FROM users WHERE phonenum = '${data[2]}'`;
//searchDb(sql, ifExists);
showAll();


