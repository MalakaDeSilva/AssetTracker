const express = require("express");
const Device = require("../controller/device.dao.js");
const DeviceType = require("../controller/device.type.dao.js");

const Router = express.Router();

Router.post("/new-device", async (req, res) => {
  let device = {
    serialNo: req.body.serialNo,
    model: req.body.model,
    powerAdapter: req.body.powerAdapter,
    bag: req.body.bag,
    typeId: req.body.typeId,
    vendor: req.body.vendor,
    invoiceNo: req.body.invoiceNo,
    remarks: req.body.remarks,
    //deviceType: await DeviceType.findById(req.body.typeId)
  };

  device["deviceType"] = await DeviceType.findById(req.body.typeId);

  if (Object.keys(req.body).includes("isAvailable"))
    device["isAvailable"] = req.body.isAvailable;

  Device.create(device)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(200).json({ error: err });
    });
});

Router.get("/:all", (req, res) => {
  let withRelations = req.params.all === "all";
  Device.findMany(withRelations)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.get("/:id/:all", (req, res) => {
  let withRelations = req.params.all === "all";
  Device.findById(parseInt(req.params.id), withRelations)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.put("/:id", (req, res) => {
  let device = {
    serialNo: req.body.serialNo,
    model: req.body.model,
    powerAdapter: req.body.powerAdapter,
    bag: req.body.bag,
    typeId: req.body.deviceType,
    vendor: req.body.vendor,
    invoiceNo: req.body.invoiceNo,
    remarks: req.body.remarks,
  };

  if (Object.keys(req.body).includes("isAvailable"))
    device["isAvailable"] = req.body.isAvailable;

  Device.updateById(id, device)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.delete("/:id", (req, res) => {
  Device.deleteById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

module.exports = Router;
