const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create geo location schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

// create name Schema & model
const nameSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  rank: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
});

const Names = mongoose.model("names", nameSchema);

module.exports = Names;
