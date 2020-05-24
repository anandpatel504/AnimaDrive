const env = require('dotenv').config()
console.log(process.env.host);

var knex = require('knex')({
    client: "mysql",
    connection: {
        host : process.env.host,
        user : process.env.user,
        password : process.env.password,
        database : process.env.database
    }
})
// Create student_register table
    knex.schema.createTable('student_register', function(table){
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.bigInteger('whats_app_number');
        table.string("institute");

     }).then(() => {
        console.log("student_register table created successfully....")
     }).catch(() => {
        console.log("student_register table is already exists!");
    });
// Create teacher_register table
    knex.schema.createTable('teacher_register', function(table){
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.bigInteger('whats_app_number');
        table.string("institute");
        table.string("board_of_institute");
    }).then(() => {
        console.log("teacher_register table created successfully....")
    }).catch(() => {
        console.log("teacher_register table is already exists!");
    });

module.exports = knex;