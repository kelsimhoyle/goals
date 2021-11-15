const Category = require("../db/models/Category");
const Goal = require("../db/models/Goal");
const UserGoal = require("../db/models/UserGoal");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
    }

    const { category_id, user_id, goal_id } = req.body;

    const userGoal = new UserGoal({
      category_id,
      user_id,
      goal_id,
    });

    UserGoal.create(userGoal, (error, data) => {
      if (error) {
        res.status(500).send({
          message:
            error.message || "An error occured while creating a user goal.",
        });
      } else {
        res.send(data);
      }
    });
  },
  createNewGoal: (req, res) => {
    if (!req.body || !req.body.goal || !req.body.category ) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
    }

    const { goal, category } = req.body;
    console.log(category);
    const todayDate = new Date().toISOString().slice(0, 10);

    const newGoal = new Goal({
      ...goal,
      created_date: todayDate,
    });

    UserGoal.createUserGoal(
      req.params.id,
      newGoal,
      category.title,
      (err, data) => {
        res.send(data);
      }
    );
  },
  getById: (req, res) => {
    UserGoal.getById(req.params.id, (error, data) => {
      if (error) res.send(error);

      res.send(data);
    });
  },
  getAll: (req, res) => {
    UserGoal.getAll((error, data) => {
      res.send(error ? error : data);
    });
  },
  getByUserId: (req, res) => {
    const orderby = req.query.orderby || null;
    const order = req.query.order || "ASC";
    const category = req.query.category || null;

    UserGoal.getByUserId(
      req.params.id,
      { orderby, order, category },
      (error, data) => {
        if (error) res.send(error);
        res.send(data);
      }
    );
  },
  updateOne: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
    }

    const { category_id, user_id, goal_id } = req.body;

    UserGoal.updateById(
      req.params.id,
      {
        category_id,
        user_id,
        goal_id,
      },
      (error, data) => {
        if (error) {
          if (error.kind === "not_found") {
            res.status(404).send({
              message: `No user goal found with the id ${req.params.id}`,
            });
          } else {
            res.send(error);
          }
        }

        res.send(data);
      }
    );
  },
  deleteOne: (req, res) => {
    UserGoal.deleteById(req.params.id, (error, data) => {
      res.send(
        data
          ? {
              message: `Deleted one user goal with the id ${req.params.id}`,
            }
          : error
      );
    });
  },
};
