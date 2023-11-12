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

Router.get("/:all", (req, res) => {
  let withRelations = req.params.all === "all";
  DeviceType.findMany(withRelations)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.get("/:id/:all", (req, res) => {
  let withRelations = req.params.all === "all";
  DeviceType.findById(parseInt(req.params.id), withRelations)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.delete("/:id", (req, res) => {
  DeviceType.deleteById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

module.exports = Router;
