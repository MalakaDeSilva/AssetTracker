import { DeviceType } from "../controller/device.type.dao.js";
import express from "express";

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

Router.get("/:id", (req, res) => {
  DeviceType.findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.delete("/:id", (req, res) => {
  DeviceType.deleteById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

export default Router;
