import { Employee } from "../dao/employee.dao.js";
import express from "express";

const Router = express.Router();

Router.post("/new-employee", (req, res) => {
  let employee = {
    coreId: req.body.coreId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  Employee.create(employee)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.get("/:coreId", (req, res) => {
  Employee.findByCoreId(req.params.coreId)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.put("/:coreId", (req, res) => {
  let employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  Employee.updateByCoreId(req.params.coreId, employee)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.delete("/:coreId", (req, res) => {
  Employee.deleteByCoreId(req.params.coreId)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

export default Router;
