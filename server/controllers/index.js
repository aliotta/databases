var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(req, res);
      // console.log("DATA PASSED HERE " + res[0])
      // req.on('error', function(err){
      //   console.log("ERROR GETTING ", err)
      // })
      // req.on('end', function(){
      //   console.log("DONE ", JSON.stringify(data))
      //   res.end(JSON.stringify(data))
      // })
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body.username, req.body.message, req.body.roomname, res);

      //req.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log("GETTING users")
      //req.end();
    },
    post: function (req, res) {
      models.users.post(req.body.username, res);
      //req.end();
    }
  }
};

