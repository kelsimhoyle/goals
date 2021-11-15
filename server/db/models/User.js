const query = require("../util/query");
const BlackListToken = require("./BlackListToken");
const sql = require("../util/db");

class User {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    this.token = user.token;
  }

  static create(newUser, result) {
    return query.insert("user", newUser, result);
  }

  static getAll(result) {
    return query.selectAll("user", result);
  }

  static findById(userId, result) {
    return query.findById("user", userId, result);
  }

  static findByEmail(email, result) {
    return sql.query(
      `SELECT * FROM user WHERE email = ?`,
      email,
      (error, res) => {
        if (error) {
          console.log(error);
          return result(error, null);
        } else if (res.length === 0) {
          return result({ type: "not_found" }, res);
        }

        return result(null, res[0]);
      }
    );
  }

  static updateById(id, user, result) {
    return query.updateById("user", id, user, result);
  }

  static deleteById(id, result) {
    return query.deleteById("user", id, result);
  }

  static logOut(user, result) {
    console.log(user)
    BlackListToken.create({ token: user.token }, (error, data) => {
      if (error) return result(error, null);

      return result(null, data);
    });
  }
}

module.exports = User;
