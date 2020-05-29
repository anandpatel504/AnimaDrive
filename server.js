const express = require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(express.json());
const Swal = require('sweetalert');
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname))

let knex = require("./models/database")
// console.log('database', knex);

// Redirect main_page;
app.get("/", (req, res) => {
	res.redirect("/main_page");
});

// Get main page
app.get("/main_page", (req, res) => {
    res.sendFile(__dirname + '/animadrive/social_pathshala.html');
    console.log('main page is open :)');
});

// route to student_register.js
let student_register = express.Router();
app.use("/", student_register);
require("./Routes/student_register")(student_register, Swal, path, knex);

// route to teacher_register.js
let teacher_register = express.Router();
app.use("/", teacher_register);
require("./Routes/teacher_register")(teacher_register, Swal, path, knex);

// the port listener
const server = app.listen(3050, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log({"Wooh..": "Thanks! Anand for running backend part."})
    console.log("Your server is running on  port....")
    console.log(host, port);
})
