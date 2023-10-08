import { User } from "../controller/user.dao.js";
import express from "express";

const Router = express.Router();

Router.post("/new-user", (req, res) => {
  let user = {
    coreId: req.body.coreId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  User.create(user)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.get("/:coreId", (req, res) => {
  User.findByCoreId(req.params.coreId)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.put("/:coreId", (req, res) => {
  let user = {
    coreId: req.body.coreId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  User.updateByCoreId(req.params.coreId, user)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

Router.delete("/:coreId", (req, res) => {
  User.deleteByCoreId(req.params.coreId)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(200).json({ error: err }));
});

export default Router;
