const query = require("../util/query");
const sql = require("../util/db");

class Category {
  constructor(category) {
    this.title = category.title;
  }

  static async create(newCategory, result) {
    return query.insert("category", newCategory, result);
  }

  static async getAll(result) {
    return query.selectAll("category", result);
  }

  static async findById(id, result) {
    return query.findById("category", id, result);
  }

  static async findByTitle(title, result) {
    sql.query(`SELECT * FROM category WHERE title = ?`, title, (error, res) => {
      if (error) {
        console.log("error", error);
        return result(error, null);
      } else {
        if (res.length === 0) {
          result({ type: "not_found" }, res);
        }
        console.log(res[0]);
        return result(null, res[0]);
      }
    });
  }
}

module.exports = Category;
