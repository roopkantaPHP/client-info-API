var express = require("express"),
  client = require("./models/client");
var bodyparser = require("body-parser");
var serverConfig = require("./serverConfig.json");
var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//Define all the routes for API
app.get("/client", client.findAll);
app.get("/client/:id", client.findById);
app.post("/client", client.addClient);
app.put("/client/:id", client.updateClient);
app.delete("/client/:id", client.deleteClient);

app.listen(serverConfig.PORT);
console.log("Listening on port 3000...");
