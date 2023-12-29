const DeviceAllocation = require("../controller/device.allocation.dao.js");

const express = require("express");

const Router = express.Router();

Router.post("/allocate-device", async (req, res) => {
  let deviceAlloc = {
    employeeId: req.body.employeeId,
    userId: req.body.userId,
    deviceId: req.body.deviceId,
    remarks: req.body.remarks,
    hasReturned: req.body?.hasReturned,
    handedOn: req.body?.handedOn,
    returnedOn: req.body?.returnedOn,
  };

  DeviceAllocation.create(deviceAlloc)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(200).json({ error: err });
    });
});

Router.get("/", (req, res) => {
  let withRelations = req.query.all === "y";
  let id = req.query.id;

  let filter = req.query;
  delete filter.all;

  if (id) {
    DeviceAllocation.findById(parseInt(id), withRelations)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(200).json({ error: err }));
  } else {
    DeviceAllocation.findMany(withRelations, filter)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(200).json({ error: err }));
  }
});

Router.delete("/:id", (req, res) => {
  DeviceAllocation.deleteById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.put("/:id", (req, res) => {
  try {
    DeviceAllocation.updateById(parseInt(req.params.id), {
      employeeId: req.body.employeeId,
      userId: req.body.userId,
      handedOn: req.body.handedOn,
      returnedOn: req.body.returnedOn,
      remarks: req.body.remarks,
      hasReturned: req.body?.hasReturned,
      handedOn: req.body?.handedOn,
      returnedOn: req.body?.returnedOn,
    })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(200).json({ error: err }));
  } catch (e) {
    res.status(200).json({ error: "Invalid allocation id." });
  }
});

module.exports = Router;
