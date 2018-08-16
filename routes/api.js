const express = require("express");
const router = express.Router();
const Names = require("../models/names");

//get list of names from db
router.get("/military", (req, res, next) => {
  Names.find({}).then(() => {});
  Names.geoNear(
    {
      type: "Point",
      coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
    },
    { maxDistance: 100000, spherical: true }
  ).then(names => {
    res.send(names);
  });
});
// add new name to db
router.post("/military", (req, res, next) => {
  Names.create(req.body)
    .then(names => {
      res.send(names);
    })
    .catch(next);
});
//update a name in db
router.put("/military/:id", (req, res, next) => {
  Names.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Names.findOne({ _id: req.params.id }).then(names => {
      res.send(names);
    });
  });
});

//delete name from db
router.delete("/military/:id", (req, res, next) => {
  Names.findByIdAndRemove({ _id: req.params.id }).then(names => {
    res.send(names);
  });
});

module.exports = router;
