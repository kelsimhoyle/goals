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

    let queryString = `SELECT goal.id AS goal_id, category.title AS category, goal.title AS goal, goal.created_date, goal.target_date, goal.completed
      FROM user_goal
      LEFT JOIN category ON user_goal.category_id = category.id
      LEFT JOIN goal ON user_goal.goal_id = goal.id
      WHERE user_goal.user_id = ?`;
    if (category) {
      queryString += ` AND user_goal.category_id = ${category}`;
    }

    if (orderby) {
      queryString += ` ORDER BY ${orderby} ${order}`;
    }
    sql.query(`${queryString};`, userId, (error, res) => {
      if (error) return result(error, null);
      return result(null, res);
    });
  }

  static async createUserGoal(userId, goal, category, result) {
    // see if the category exists

    sql.query(
      `
      INSERT INTO  category (title) SELECT "${category}" WHERE   NOT EXISTS (SELECT id FROM category WHERE title = ? );
      `,
      category
    ),
      (error, res) => {
        if (error) {
          return result(error, null);
        }
      };

    sql.query(
      `SELECT id FROM category where title = ?;`,
      category,
      (error, catId) => {
        sql.query(`INSERT INTO goal SET ?`, goal, (error, newGoal) => {
          sql.query(
            `INSERT INTO user_goal (user_id, goal_id, category_id) VALUES (?, ?, ?);`,
            [userId, newGoal.insertId, catId[0].id],
            (error, newUserGoal) => {
              return result(null, newUserGoal);
            }
          );
        });
      }
    );
  }
}

module.exports = UserGoal;
