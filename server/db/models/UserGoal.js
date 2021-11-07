const query = require("../util/query");
const sql = require("../util/db");

class UserGoal {
  constructor(userGoal) {
    this.category_id = userGoal.category_id;
    this.user_id = userGoal.user_id;
    this.goal_id = userGoal.goal_id;
  }

  static create(newUserGoal, result) {
    return query.insert("user_goal", newUserGoal, result);
  }

  static getAll(result) {
    return query.selectAll("user_goal", result);
  }

  static getById(id, result) {
    return query.findById("user_goal", id, result);
  }

  static updateById(id, update, result) {
    return query.updateById("user_goal", id, update, result);
  }

  static deleteById(id, result) {
    return query.deleteById("user", id, result);
  }

  static getByUserId(userId, options, result) {
    const { orderby, order, category } = options;
    console.log(options)

    let queryString = `SELECT goal.id AS goal_id, category.title AS category, goal.title AS goal, goal.created_date, goal.target_date, goal.completed
      FROM user_goal
      LEFT JOIN category ON user_goal.category_id = category.id
      LEFT JOIN goal ON user_goal.goal_id = goal.id
      WHERE user_goal.user_id = ?`;
    if (category) {
      queryString += ` AND user_goal.category_id = ${category}`;
    } else if (orderby) {
      queryString += ` ORDER BY ${orderby} ${order}`;
    }
    sql.query(`${queryString};`, userId, (error, res) => {
      if (error) return result(error, null);
      return result(null, res)
    });
  }
}

module.exports = UserGoal;
