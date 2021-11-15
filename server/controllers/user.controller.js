const User = require("../db/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  create: async (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
    }

    const { first_name, last_name, email, password } = req.body;
    if (!(email || password || first_name || last_name)) {
      res.status(400).send("All input is required");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    User.create(user, (error, newUser) => {
      if (error)
        res.status(500).send({
          message:
            error.message || "Some error occurred while creating the user.",
        });
      else {
        const token = jwt.sign(
          { user_id: newUser.id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.send({ ...newUser, token });
      }
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
  login: (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase().trim();

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    User.findByEmail(email, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        if (bcrypt.compare(password, data.password)) {
          const token = jwt.sign(
            { user_id: data.id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          res.send({ ...data, token });
        }
      }
    });
  },
  logout: (req, res) => {
    User.logOut(req.body.user, (error, data) => {
      if (error) res.send(error);
      res.send(data);
    });
  },
};
