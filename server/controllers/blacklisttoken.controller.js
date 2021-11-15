const BlackListToken = require("../db/models/BlackListToken");

module.exports = {
    create: (req, res) => {
        if (!req.body) {
            res.status(400).send({
              message: "Content cannot be empty!",
            });
          }

          BlackListToken.create(req.token, (error, result) => {
              if (error) res.send(error)
              res.send("result")
          })
    }
}