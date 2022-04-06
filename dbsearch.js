var mysql = require('mysql');

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

function searchDb(data, callback){
        con.query(data, function (err, result) {
          if (err) throw err;
          return callback(data, result)
        });
}

function ifExists(sql, data){
    var bool = new Boolean();
    if(data == 0){
        console.log(sql + ": doesnt exist");
        bool = false;
        console.log(bool);
    }
    else{
        console.log(sql + ": exists");
        bool = true;
        console.log(bool);
    }
    console.log("returning bool: " + bool);
    return bool;
}

function ifExistsTF(data){
    var sql = `SELECT * FROM users WHERE phonenum = '${data[2]}'`;
    console.log(searchDb(sql, ifExists) + "test");

    var sql = `SELECT * FROM users WHERE email = '${data[3]}'`;
    console.log(searchDb(sql, ifExists) + "test");
}

var data = new Array();
data.push('Ismail');
data.push('Nazwan');
data.push('9639137');
data.push('test@gmail.com');
data.push('1234');

connectToDb();
ifExistsTF(data);