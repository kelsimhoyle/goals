const sql = require("../util/db");
const query = require("../util/query");

class Goal {
  constructor(goal) {
    this.title = goal.title;
    this.created_date = goal.created_date;
    this.target_date = goal.target_date;
    this.completed = goal.completed;
  }

  static async create(newGoal, result) {
    return query.insert("goal", newGoal, result);
  }

  static async getAll(result) {
    return query.selectAll("goal", result);
  }
  static async findById(goalId, result) {
    return query.findById("goal", goalId, result);
  }

  static async updateById(id, goal, result) {
    return query.updateById("goal", id, goal, result);
  }

  static async deleteById(id, result) {
    return query.deleteById("goal", id, result);
  }

  static async getUserGoals(id, result) {
    sql.query(
      `SELECT * FROM goal
        JOIN user ON user.id = goal.user
        AND goal.user = ?;`,
      id,
      (error, data) => {
        if (error) return result(error, null);
        result(null, data);
      }
    );
  }
}

module.exports = Goal;
