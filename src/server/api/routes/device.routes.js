const express = require("express");
const Device = require("../controller/device.dao.js");

const Router = express.Router();

Router.post("/new-device", async (req, res) => {
  let device = {
    serialNo: req.body.serialNo,
    model: req.body.model,
    powerAdapter: req.body.powerAdapter,
    bag: req.body.bag,
    typeId: req.body.typeId,
    warranty: req.body?.warranty,
    warrantyPeriod: parseFloat(req.body?.warrantyPeriod),
    remarks: req.body.remarks,
  };

  if (Object.keys(req.body).includes("isAvailable"))
    device["isAvailable"] = req.body.isAvailable;

  Device.create(device)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(200).json({ error: err });
    });
});

Router.get("/", (req, res) => {
  let withRelations = req.query.all === "y";
  let serialNo = req.query.serialNo;

  let filter = req.query;
  delete filter.all;

  if (serialNo) {
    Device.findById(serialNo, withRelations)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(200).json({ error: err }));
  } else {
    Device.findMany(withRelations, filter)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(200).json({ error: err }));
  }
});

Router.put("/:serialNo", (req, res) => {
  let device = {
    model: req.body?.model,
    powerAdapter: req.body?.powerAdapter,
    bag: req.body?.bag,
    typeId: req.body?.deviceType,
    warranty: req.body?.warranty,
    warrantyPeriod: req.body?.warrantyPeriod,
    isAvailable: req.body?.isAvailable,
    remarks: req.body?.remarks,
  };

  if (Object.keys(req.body).includes("isAvailable"))
    device["isAvailable"] = req.body.isAvailable;

  Device.updateById(req.params.serialNo, device)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.delete("/:serialNo", (req, res) => {
  Device.deleteById(req.params.serialNo)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.post("/filter", (req, res) => {
  Device.findUsingFilters(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

module.exports = Router;
