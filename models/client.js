var mongo = require("mongodb");
var ObjectId = mongo.ObjectId;
var dbConfig = require("../dbConfig.json");
var errorConfig = require("../errorConfig.json");

var Server = mongo.Server,
  Db = mongo.Db,
  BSON = mongo.BSONPure;

var server = new Server(dbConfig.mongoDB.HOST, dbConfig.mongoDB.PORT, {
  auto_reconnect: true,
});

//Creating db connection object
db = new Db(dbConfig.mongoDB.DBNAME, server);

//Connecting to database
db.open(function (err, db) {
  if (!err) {
    console.log("Connected to 'clientdb' database");
    db.collection("client", { strict: true }, function (err, collection) {
      if (err) {
        console.log(
          "The 'client' collection doesn't exist. Creating it with sample data..."
        );
      }
    });
  } else {
    console.log(errorConfig.DB_CONNECTION_ERROR.details);
  }
});

/**
 * Retriving client details by object id created for client
 * @param {*} req standard http request object
 * @param {*} res standard http response object
 */
exports.findById = function (req, res) {
  var clientId = req.params.id;
  db.collection("client", function (err, collection) {
    if (err) {
      res.send(
        errorConfig.DB_CONNECTION_ERROR.HTTPCODE,
        errorConfig.DB_CONNECTION_ERROR.details
      );
    } else {
      collection.findOne({ _id: new ObjectId(clientId) }, function (err, item) {
        if (err) {
          res.send(
            errorConfig.RECORD_NOT_FOUND.HTTPCODE,
            errorConfig.RECORD_NOT_FOUND.details
          );
        } else {
          res.send(item);
        }
      });
    }
  });
};
/**
 * This function retrieve  all the details of every client in json format
 * @param {*} req standard http request object
 * @param {*} res standard http response object
 */
exports.findAll = function (req, res) {
  db.collection("client", function (err, collection) {
    if (err) {
      res.send(
        errorConfig.DB_CONNECTION_ERROR.HTTPCODE,
        errorConfig.DB_CONNECTION_ERROR.details
      );
    } else {
      collection.find().toArray(function (err, items) {
        if (err) {
          res.send(
            errorConfig.RECORD_NOT_FOUND.HTTPCODE,
            errorConfig.RECORD_NOT_FOUND.details
          );
        } else {
          res.send(items);
        }
      });
    }
  });
};

/**
 * Adding a new client
 * @param {*} req standard http request object(First Name,Last Name,
 * Address,Phone number,Date added,Assigned Lawyer,Notes)
 * @param {*} res standard http response object
 */
exports.addClient = function (req, res) {
  var client = req.body;
  client.dateAdded = new Date().toISOString().slice(0, 10);
  console.log("Adding client: " + JSON.stringify(client));
  db.collection("client", function (err, collection) {
    if (err) {
      res.send(
        errorConfig.DB_CONNECTION_ERROR.HTTPCODE,
        errorConfig.DB_CONNECTION_ERROR.details
      );
    } else {
      collection.insert(client, { safe: true }, function (err, result) {
        if (err) {
          res.send(
            errorConfig.INSERTION_ERROR.HTTPCODE,
            errorConfig.INSERTION_ERROR.details
          );
        } else {
          console.log(result.insertedIds, "------Success: ");
          res.send(201, { id: result.insertedIds[0] });
        }
      });
    }
  });
};
/**
 * This function updating client details by using ObjectID
 * @param {*} req standard http request object 
 * @param {*} res standard http response object

 */
exports.updateClient = function (req, res) {
  var id = req.params.id;
  var requestBody = req.body;

  db.collection("client", function (err, collection) {
    if (err) {
      res.send(
        errorConfig.DB_CONNECTION_ERROR.HTTPCODE,
        errorConfig.DB_CONNECTION_ERROR.details
      );
    } else {
      collection.update(
        { _id: new ObjectId(id) },
        requestBody,
        { safe: true },
        function (err, result) {
          if (err) {
            res.send(
              errorConfig.UPDATE_ERROR.HTTPCODE,
              errorConfig.UPDATE_ERROR.details
            );
          } else {
            res.send(requestBody);
          }
        }
      );
    }
  });
};

/**
 * It deletes client document by using ObjectId from database
 * @param {*} req standard http request object
 * @param {*} res standard http response object
 */
exports.deleteClient = function (req, res) {
  var id = req.params.id;
  db.collection("client", function (err, collection) {
    if (err) {
      res.send(
        errorConfig.DB_CONNECTION_ERROR.HTTPCODE,
        errorConfig.DB_CONNECTION_ERROR.details
      );
    } else {
      collection.remove({ _id: new ObjectId(id) }, { safe: true }, function (
        err,
        result
      ) {
        if (err) {
          res.send(
            errorConfig.DELETE_ERROR.HTTPCODE,
            errorConfig.DELETE_ERROR.details
          );
        } else {
          res.send(req.body);
        }
      });
    }
  });
};
