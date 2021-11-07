const User = require("../db/models/User");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
    }

    const user = new User({
      name: req.body.name,
    });

    User.create(user, (error, data) => {
      if (error)
        res.status(500).send({
          message:
            error.message || "Some error occurred while creating the user.",
        });
      else res.send(data);
    });
  },
  findAll: (req, res) => {
    User.getAll((error, data) => {
      if (error)
        res.status(500).send({
          message:
            error.message || "Some error occurred while retrieving users.",
        });

      res.send(data);
    });
  },
  findOne: (req, res) => {
    User.findById(req.params.id, (error, data) => {
      console.log(error, data);
      if (error)
        return res.send({
          message: error.message || "User not found with this id",
        });

      res.send(data);
    });
  },
  updateOne: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
    }

    User.updateById(req.params.id, new User(req.body), (error, data) => {
      if (error) {
        if (error.kind === "not_found") {
          return res.status(404).send({
            message: `No user found with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating user with id ${req.params.id}.`,
          });
        }
      }

      res.send(data);
    });
  },
  deleteOne: (req, res) => {
    User.deleteById(req.params.id, (error, data) => {
      if (error) {
        if (error.kind === "not_found") {
          return res.status(404).send({
            message: `No user found with id ${req.params.id}.`,
          });
        } else {
          return res.status(500).send({
            message: `Error deleting user with id ${req.params.id}.`,
          });
        }
      }
      return res.send({
        message: `User succesfully deleted.`,
      });
    });
  },
};
