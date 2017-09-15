var mysql = require('mysql');
var getStudent;
getStudent = [{'name':'Ahmed Sayed', 'contact':'17737032688', 'hawkid':'A20388365'},
              {'name':'Zeshan Sayed', 'contact':'16507978341', 'hawkid':'A20388365'},
              {'name':'Tejas Manoj', 'contact':'13126782891', 'hawkid':'A20388365'},
              {'name':'Mudassir Vavathar', 'contact':'17737876305', 'hawkid':'A20388365'},
              {'name':'Divyank', 'contact':'12016260675', 'hawkid':'A20388365'}];
var $;
var env = require('require-env');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
require("jsdom/lib/old-api").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
    $ = require("jquery")(window);
    //doSomething();
});

var con = mysql.createConnection({
    host: "iotpublicsafety.ck1hiahkkkxg.us-west-2.rds.amazonaws.com",
    port: 3306,
    user: "IITPublicSafety",
    password: "!!tChicago",
    database: "iotpublicsafety",
    //timeout: 10000
});

var renderTable = function(getStudent) {
    console.log("In render table");
    var tableID = $("#student");
    for (var i = 0; i < getStudent.length; i++) {
        var row = '<tr>' +
            '<td>' + getStudent[i].name + '</td>' +
            '<td>' + getStudent[i].contact + '</td>' +
            '</tr>';
        tableID.append(row);
        console.log(row);
    }

}
var callback = function(getStudent) {
    console.log("In Post");
    var request = require('request');
    console.log(getStudent);

    $.ajax({
        url: 'http://172.20.10.4:8080/myaction',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(getStudent),
        success: postSuccessHandler
    });

    function postSuccessHandler(jsonData) {
        console.log("Success");
    };
} //postItem()

app.post('/connectDatabase', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("In Connect Database");
    var test = req.body;
    con.connect(function(err) {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return;
        }
        console.log(test);
        console.log('Connected to database.');
        //var sql = "CREATE TABLE students (name VARCHAR(255), contact VARCHAR(255))";
        //var sql = "CREATE DATABASE iotpublicsafety"
        //var sql = "INSERT INTO students (name, contact) VALUES ?";
        var count = 3;
        //var sql = "Select * from students Limit " + count;
        var sql = "Select * from students Limit " + count;
        con.query(sql, function(err, rows, result) {
            if (err) throw err;
            //console.log("Number of records inserted: " , result);
            //getStudent = [];

            var array = [];
            for (var i = 0; i < rows.length; i++) {
                //array.push({name: rows[i].name, contact: rows[i].contact });
                var obj = {};
                obj.name = rows[i].name;
                obj.contact = rows[i].contact;
                array.push(obj);
            }
            //connection.end();
            console.log(array);
            getStudent = array;
            //     renderTable(getStudent);
            console.log("End");

        });
    });
    console.log(getStudent);
    // res.type('json');
    // res.send(JSON.stringify(getStudent));
    res.end();
    //con.end();
    //res.end();
    //next();
});


//app.use(express.bodyParser());

app.post('/sendData', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("In Laptop Server");
    var test = req.body;
    console.log(test);
    console.log(JSON.stringify(test));
    callback(getStudent);

    res.end("Fuck you buddy !!!");
    //next();
});

app.post('/getStudentInfo', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log("Sending Data....");
    res.type('json');
    res.send(JSON.stringify(getStudent));

    res.end();
    //next();
});

app.listen(8080, function() {
    console.log('Server running at Raspberry Pi @ 192.168.1.104');
});
