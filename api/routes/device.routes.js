import { Device } from "../controller/device.dao.js";
import express from "express";

const Router = express.Router();

Router.post("/new-device", (req, res) => {
  let device = {
    serialNo: req.body.serialNo,
    type: req.body.deviceType,
    remarks: req.body.remarks,
  };

  if (Object.keys(req.body).includes("isAvailable"))
    device["isAvailable"] = req.body.isAvailable;

  Device.create(device)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.get("/:id", (req, res) => {
  Device.findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.put("/:id", (req, res) => {
  let device = {
    serialNo: req.body.serialNo,
    type: req.body.deviceType,
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

export default Router;
