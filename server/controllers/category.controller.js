const Category = require("../db/models/Category");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
    }
    const category = new Category({
      title: req.body.title
    });

    Category.create(category, (error, data) => {
      if (error) {
        res.status(500).send({
          message:
            error.message || "An error occured while creating a category.",
        });
      } else {
        res.send(data);
      }
    });
  },
  getById: (req, res) => {
    Category.findById(req.params.id, (error, data) => {
      if (error) {
        res.send({ message: `No category found by the id ${req.params.id}` });
      }

      res.send(data);
    });
  },
  findAll: (req, res) => {
    console.log(Category)
    Category.getAll((error, data) => {
      if (error) {
        res.send({ message: "Error retrieving categories." });
      }

      res.send(data);
    });
  },
  updateOne: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
    }

    const { title, goal } = req.body;
    Category.updateById(
      req.params.id,
      {
        title,
        goal,
      },
      (error, data) => {
        if (error) {
          if (error.kind === "not_found") {
            res
              .status(404)
              .send({
                message: `No category found with the id ${req.params.id}`,
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
    if (error) res.send(error);

    res.send({ message: `Deleted one category with id ${req.params.id}` });
  },
};
