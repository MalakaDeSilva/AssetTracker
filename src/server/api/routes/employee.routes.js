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

Router.get("/", (req, res) => {
  let withRelations = req.query.all === "y";
  let coreId = req.query.coreId;

  let filter = req.query;
  delete filter.all;

  if (coreId) {
    Employee.findByCoreId(req.query.coreId, withRelations)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(200).json({ error: err }));
  } else {
    Employee.findMany(withRelations, filter)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(200).json({ error: err }));
  }
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
