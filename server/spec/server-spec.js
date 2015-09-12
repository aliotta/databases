/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;
  //this.timeout(3500);

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "test",
      database: "chat"
    });
    dbConnection.connect();
       var tablename = "messages"; // TODO: fill this out
       //var tablename2 = "messages"
    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query("truncate " + tablename, done);
    //dbConnection.query("truncate " + tablename2, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

    it("Should insert posted messages to the DB", function(done) {
      console.log("INSERTING USER");
      // Post the user to the chat server.
      request({ method: "POST",
                uri: "http://127.0.0.1:3000/classes/users",
                json: { username: "Valjean" }
      }, function () {
        console.log("POSTING MESSAGE");
        // Post a message to the node chat server:
        request({ method: "POST",
                uri: "http://127.0.0.1:3000/classes/messages",
                json: {
                  username: "Valjean",
                  message: "In mercys name three days is all I need.",
                  roomname: "Hello"
                }
        }, function () {
          console.log("VERIFYING")
          // Now if we look in the database, we should find the
          // posted message there.

          // TODO: You might have to change this test to get all the data from
          // your message table, since this is schema-dependent.
          var queryString = "SELECT * FROM messages";
          var queryArgs = [];

          dbConnection.query(queryString, queryArgs, function(err, results) {
            //Should have one result:
            console.log("RESULTS ", results)
            //expect(results.length).to.equal(1);

            // TODO: If you don't have a column named text, change this test.
            expect(results[0].message).to.equal("In mercys name three days is all I need.");

            done();
          });
        });
      });
    });

  it("Should output all messages from the DB", function(done) {
    this.timeout(5000);
    // Let's insert a message into the db
       //var tablename = "messages"; // TODO: fill this out
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */
    var username = "me";
    var message = "Men like you can never change!";
    var roomname = "main";
    var queryString = 'INSERT INTO messages (userName, message, roomName) VALUES ("' + username + '","' + message + '","' + roomname + '")'
    var queryArgs = [];
    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
        console.log("BODY ",  body);
        //messageLog = JSON.parse(body);
        //expect(messageLog[0].text).to.equal("Men like you can never change!");
        //expect(messageLog[0].roomname).to.equal("main");
        done();
      });
    });
  });
});
