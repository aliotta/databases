var db = require('../db');

var dbConnection = db.dbConnection;

myQuery = 'SHOW COLUMNS FROM messages';

var sequelize = db.sequelize;
var seqUsers = db.users;
var seqMessages = db.messages;
//console.log("sequelize " , seqMessages)

module.exports = {
  messages: {
    get: function (req, res) {



      seqMessages.findAll().then(function(msgs){
        //console.log("FOUND EM ALL ", msgs)
        var returnArray = []
        var returnData;
        for (var i = 0; i < msgs.length; i++) {
          returnData = {};
          returnData.text = msgs[i].message;
          returnData.roomname =msgs[i].roomName;
          returnArray.push(returnData);
        };
        returnArray = JSON.stringify(returnArray)
        console.log("Over here !!!!", returnArray)
        res.send(returnArray);
      })

    }, // a function which produces all the messages
    post: function (username, message, roomname, res) {
      //console.log(username)

      
      seqMessages.sync().then(function() {
        /* This callback function is called once sync succeeds. */
        //console.log("HERE", username)
        // now instantiate an object and save it:
        
        var newUser = seqMessages.build({userName: username, message: message, roomName:roomname});
        newUser.save().then(function() {
          console.log("posting message here")
          res.end();
        });
      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (username, res) {
      //var post  = {title : "test", artist:"test2"};
      //console.log(sequelize);
      seqUsers.sync().then(function() {
        /* This callback function is called once sync succeeds. */

        // now instantiate an object and save it:
        var newUser = seqUsers.build({userName: username});
        newUser.save().then(function() {
          console.log("SAVING ")
          res.end();
        });
      });
    }
  }
};
