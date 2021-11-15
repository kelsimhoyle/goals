const jwt = require("jsonwebtoken");
const config = process.env;
const BlackListToken = require("../db/models/BlackListToken");

const verifyToken = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    BlackListToken.getByToken(token, (error, data) => {
        if (data.length) {
            return res.send("You must login")
        }
    }) 
    
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
  
  module.exports = verifyToken;