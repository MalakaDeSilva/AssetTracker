import { DeviceAllocation } from "../dao/device.allocation.dao.js";
import express from "express";

const Router = express.Router();

Router.post("/allocate-device", (req, res) => {
  DeviceAllocation.create({
    employeeId: req.body.employeeId,
    userId: req.body.userId,
    handedOn: req.body.handedOn,
    returnedOn: req.body.returnedOn,
    remarks: req.body.remarks,
  })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.get("/:id", (req, res) => {
  DeviceAllocation.findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.delete("/:id", (req, res) => {
  DeviceAllocation.deleteById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.put("/:id", (req, res) => {
  DeviceAllocation.updateById(id, {
    employeeId: req.body.employeeId,
    userId: req.body.userId,
    handedOn: req.body.handedOn,
    returnedOn: req.body.returnedOn,
    remarks: req.body.remarks,
  })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

export default Router;
