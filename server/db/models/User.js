const query = require("../util/query");

class User {
  constructor(user) {
    this.name = user.name;
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

  static updateById(id, user, result) {
    return query.updateById("user", id, user, result);
  }

  static deleteById(id, result) {
    return query.deleteById("user", id, result);
  }
}

module.exports = User;
