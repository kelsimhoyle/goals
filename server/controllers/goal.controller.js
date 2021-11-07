const Goal = require("../db/models/Goal");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
    }

    const { title, target_date } = req.body;
    const todayDate = new Date().toISOString().slice(0, 10);

    const goal = new Goal({
      title,
      created_date: todayDate,
      target_date: target_date || null,
      completed: false,
    });

    Goal.create(goal, (error, data) => {
      if (error)
        res.status(500).send({
          message:
            error.message || "Some error occurred while creating new goal.",
        });
      else res.send(data);
    });
  },
  getById: (req, res) => {
      Goal.findById(req.params.id, (error, data) => {
          if (error) {
              res.send({message: `No goal found by the id ${req.params.id}`})
          }

          res.send(data)
      })
  },
  findAll: (req, res) => {
      Goal.getAll((error, data) => {
          if (error) {
              res.send({message: "Error retrieving goals"})
          }

          res.send(data)
      })
  },
  updateOne: (req, res) => {
      if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!",
          });
      }
      const { title, target_date, completed } = req.body;
      const newTargetDate = new Date(target_date).toISOString().slice(0, 10);


      Goal.updateById(req.params.id, {
          title, target_date: newTargetDate, completed
      },
      (error, data) => {
          if (error) {
              if (error.kind === "not_found") {
                  res.status(404).send({message: `No goal found with the id ${req.params.id}`})
              } else {
                  res.send(error)
              }
          }

          res.send(data)
      })
  },
  deletedOne: (req, res) => {
      Goal.deleteById(req.params.id, (error, data) => {
          if (error) res.send(error)

          res.send({message: `Deleted one goal with id ${req.params.id}`})
      });
  },
  getUserGoals: (req, res) => {
      Goal.getUserGoals(req.params.id, (error, data) => {
          if (error) res.send(error)
          res.send(data)
      })
  }
};
