const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//connect to mongodb
mongoose.connect(
  "mongodb://commander:password1@ds121982.mlab.com:21982/military",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

// set up express app
const app = express();

app.use(express.static("public"));

app.use(bodyParser.json());

//initialize routes
app.use("/api", routes);

//listen for request
app.listen(process.env.port || 4000, () => {
  console.log("Now listening for request");
});

//error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({
    error: err.message
  });
});
