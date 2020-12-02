var express = require("express");
var bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cinepede_user:Cinepede2020@cluster0.gocey.mongodb.net/cinepede_db?retryWrites=true&w=majority";
const dbclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var movieCollection= "movieinfo";
var ObjectID = require('mongodb').ObjectID;

var app = express();
app.use(bodyParser.json());
app.set('json spaces', 2);
// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
dbclient.connect(function (err, client) {
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
  
  /*  "/api/movies"
   *    GET: finds all movies 
   */
  
  app.get("/api/movies", function(req, res) {
    var yr = req.query.year_ceremony;
    var yr_num= parseInt(yr);
    if(typeof yr != 'undefined'){
        console.log("showing movies for the year:" + yr);
        db.collection('movieinfo').find({year_ceremony: yr_num}).toArray(function(err, docs) {
            if (err) {
              handleError(res, err.message, "Failed to get filtered movies.");
            } else {
              console.log("movie collection found");
              res.status(200).json(docs);
            }
          });
      }
    else{
        console.log("showing all movies");
        db.collection('movieinfo').find().toArray(function(err, docs) {
            if (err) {
              handleError(res, err.message, "Failed to get all movies.");
            } else {
              console.log("movie collection found");
              res.status(200).json(docs);
            }
          });
    }
    
  });
  


  /*  "/api/movies/:id"
   *    GET: find movie by id
   */
  
  app.get("/api/movies/:id", function(req, res) {
    db.collection('movieinfo').findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to get nominee by ID");
        } else {
          console.log("nominee ID found: ");
          console.log(req.params.id);
          console.log(doc);
          res.status(200).json(doc);
        }
      });
  });
  
  app.put("/api/movies/:id", function(req, res) {
  });
  
  app.delete("/api/movies/:id", function(req, res) {
  });