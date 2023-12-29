const DeviceType = require("../controller/device.type.dao.js");
const express = require("express");

const Router = express.Router();

Router.post("/new-device-type", (req, res) => {
  DeviceType.create({ type: req.body.deviceType })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.put("/:id", (req, res) => {
  DeviceType.updateById(req.params.id, { type: req.body.deviceType })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.get("/", (req, res) => {
  let withRelations = req.query.all === "y";
  let id = req.query.id;

  let filter = req.query;
  delete filter.all;

  if (id) {
    DeviceType.findById(parseInt(id), withRelations)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(200).json({ error: err }));
  } else {
    DeviceType.findMany(withRelations, filter)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(200).json({ error: err }));
  }
});

Router.delete("/:id", (req, res) => {
  DeviceType.deleteById(parseInt(req.params.id))
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

module.exports = Router;
