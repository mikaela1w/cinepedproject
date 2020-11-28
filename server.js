var express = require("express");
var bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cinepede_user:Cinepede2020@cluster0.gocey.mongodb.net/cinepede_db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var movieCollection= "movieinfo";


var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
client.connect(function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }
  
  /*  "/api/contacts"
   *    GET: finds all contacts
   *    POST: creates a new contact
   */
  
  app.get("/api/movies", function(req, res) {
    db.collection(movieCollection).find({"year":"2019"}).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get movies.");
        } else {
          res.status(200).json(docs);
        }
      });
  });
  
  
  /*  "/api/contacts/:id"
   *    GET: find contact by id
   *    PUT: update contact by id
   *    DELETE: deletes contact by id
   */
  
  app.get("/api/movies/:id", function(req, res) {
  });
  
  app.put("/api/movies/:id", function(req, res) {
  });
  
  app.delete("/api/movies/:id", function(req, res) {
  });