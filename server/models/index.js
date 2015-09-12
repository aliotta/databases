var db = require('../db');

var dbConnection = db.dbConnection;

myQuery = 'SHOW COLUMNS FROM messages';

var sequelize = db.sequelize;
var seqUsers = db.users;
var seqMessages = db.messages;

module.exports = {
  messages: {
    get: function (req, res) {
      var query = 'SELECT * FROM messages';
      dbConnection.query(query, function(err, rows, fields){
        if(err){
          console.log("ERROR GETTING MESSAGE", err)
        } else {
          var returnArray = []
          var returnData;
          for (var i = 0; i < rows.length; i++) {
            returnData = {};
            returnData.text = rows[i].message;
            returnData.roomname =rows[i].roomName;
            returnArray.push(returnData);
          };
          returnArray = JSON.stringify(returnArray)
          res.send(returnArray);
        }
        
      })
      dbConnection.end();

    }, // a function which produces all the messages
    post: function (username, message, roomname, res) {
      console.log(username)
      var query = 'INSERT INTO messages (userName, message, roomName) VALUES ("' + username + '","' + message + '","' + roomname + '")';
      dbConnection.query(query,
        function selectCb(err) {
          if (err){ 
            console.log("ERROR INSERT MESSAGES ", err)
            throw err;
          }
          else {
            console.log("MESSAGE ADDED TO DB")
            res.send("Hello?");
          };
      });
      dbConnection.end();

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (username, res) {
      //var post  = {title : "test", artist:"test2"};

      dbConnection.query('INSERT INTO users (userName) VALUES ("' + username +'")',
        function selectCb(err) {
          if (err){
            console.log("ERROR In INSERT USERS ", err)
            throw err;
          }
          else {
            console.log("USER added to database", res)
            res.end();
          };
      });
      //dbConnection.end();

      
      
    }
  }
};

