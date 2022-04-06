const http = require('http');
var fs = require('fs');
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

function sqlCommandGen(data){
  var sql = `INSERT INTO users (firstname, lastname, phonenum, email, password) VALUES ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}')`;
  return sql;
}

function dbFunc(sql){
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Success: " + sql);
  });
}

function decodeAndSplit (str){
    var result = new Array();
    str = decodeURIComponent(str);
    str = str.replace(/&/g, "=").split("=");
    for(var i = 1;i < str.length; i = i + 2){
        result.push(str[i]);
    }
    return result;
}

function getLengthArr(data){
  var arr = new Array();

  con.query(`SELECT * FROM users WHERE phonenum = '${data[2]}'`, function (err, result) {
      if (err) throw err;
      arr.push(result.length);
  });
  
  con.query(`SELECT * FROM users WHERE email = '${data[3]}'`, function (err, result) {
      if (err) throw err;
      arr.push(result.length);
  });
  return arr;
}

connectToDb();

http.createServer(function (req, res) {

    if(req.url === "/create_user")
    {
      var data;
      var arr;

      function redirectMain(){
        /* req.on('end', () => {
          res.end();
        }) */

        res.writeHead(302, {
          Location: `/`
        }).end();
      }

      function processData() {
        if(arr[0] == 0 && arr[1] == 0){
            console.log("Creating user: " + arr);
            //dbFunc(sqlCommandGen(data));
            req.on('end', () => {
              res.end();
            })

            res.writeHead(302, {
              Location: `/created_user`
            }).end();
        }
        else{
            console.log("A user with the same phone number or email already exists: " + arr);
            //setTimeout(redirectMain, 1000);

            req.on('end', () => {
              res.end();
            })

            res.writeHead(302, {
              Location: `/`
            }).end();
        }
      }
        req.on('data', chunk => {
        data = decodeAndSplit(chunk);
        console.log(data);
        console.log(sqlCommandGen(data));
        arr = getLengthArr(data);
        setTimeout(processData, 500);
      })

      /* req.on('end', () => {
        res.end();
      }) */

      /* res.writeHead(301, {
        Location: `/main.html`
      }).end(); */
    }
    else
    if(req.url === "/")
    {
        var filename = 'main.html';
        fs.readFile('main.html', function(err, htmlcontent) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(htmlcontent);
          return res.end();
        });
    }
    else
    if(req.url === "/created_user"){
      //var filename = 'main.html';
        fs.readFile('created_message.html', function(err, htmlcontent) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(htmlcontent);
          return res.end();
        });
    }
  }).listen(5000);