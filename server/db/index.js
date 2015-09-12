var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

module.exports.dbConnection = mysql.createConnection({
  user: "root",
  password: "test",
  database: "chat"
})

var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'root', 'test');

var messages = sequelize.define('messages', {
  userName: Sequelize.STRING,
  roomName: Sequelize.STRING,
  message: Sequelize.STRING
}); 
var users = sequelize.define('users', {
  userName: Sequelize.STRING
});

