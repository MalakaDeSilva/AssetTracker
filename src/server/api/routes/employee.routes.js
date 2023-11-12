const Employee = require("../controller/employee.dao.js");
const express = require("express");

const Router = express.Router();

Router.post("/new-employee", (req, res) => {
  let employee = {
    coreId: req.body.coreId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    floor: parseInt(req.body.floor),
  };

  Employee.create(employee)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.get("/:all", (req, res) => {
  let withRelations = req.params.all === "all";
  Employee.findMany(withRelations)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.get("/:coreId/:all", (req, res) => {
  let withRelations = req.params.all === "all";
  Employee.findByCoreId(req.params.coreId, withRelations)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.put("/:coreId", (req, res) => {
  let employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    floor: req.body.floor,
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

module.exports = Router;
