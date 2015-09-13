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
module.exports.sequelize = sequelize;
module.exports.messages = sequelize.define('messages', {
  id: {type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true},
  userName: Sequelize.STRING,
  roomName: Sequelize.STRING,
  message: Sequelize.STRING
}, 
{
    timestamps: false
}); 
module.exports.users = sequelize.define('users', {
  //id: Sequelize.STRING,
  userName: Sequelize.STRING
},
{
    timestamps: false
});

