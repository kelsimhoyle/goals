const sql = require("./db");

const query = {
  insert: async (table, newInsert, result) => {
    sql.query(`INSERT INTO ${table} SET ?;`, newInsert, (error, res) => {
      if (error) {
        console.log("error: ", error);
        return result(error, null);
      }

      console.log(`Inserted into ${table}`, {
        id: res.insertId,
        ...newInsert,
      });
    
      return result(null, { id: res.insertId, ...newInsert });
    });
  },
  selectAll: async (table, result) => {
    sql.query(`SELECT * FROM ${table};`, (error, res) => {
      if (error) {
        console.log(error);
        result(null, error);
        return;
      }
      result(null, res);
      return;
    });
  },
  findById: async (table, id, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ?;`, id, (error, res) => {
      if (error) {
        console.log(error);
        return result(error, null);
      }

      return result(null, res[0]);
    });
  },
  updateById: async (table, id, update, result) => {
    console.log(update);
    let updates = "";
    const updateVals = [];

    const length = Object.keys(update).length - 1;
    let currentIndex = 0;

    for (const [key, value] of Object.entries(update)) {
      updateVals.push(value);

      if (length > currentIndex) {
        updates += `${key} = ?, `;
      } else {
        updates += `${key} = ? `;
      }
      currentIndex++;
    }
    sql.query(
      `UPDATE ${table} SET ${updates} WHERE id = ?;`,
      [...updateVals, id],
      (error, res) => {
        if (error) {
          console.log(error);
          return result(null, error);
        }

        if (res.affectedRows === 0) {
          return result({ kind: "not_found" }, null);
        }

        return result(null, { id: id, ...update });
      }
    );
  },
  updateByid: async (table, id, result) => {
    sql.query(`DELETE FROM ${table} WHERE id = ?;`, [id], (error, res) => {
      if (error) {
        console.log(error);
        return result(null, error);
      }

      if (res.affectedRows === 0) return result({ kind: "not_found" }, null);

      console.log(
        `Deleted ${res.affectedRows} items from ${table} with id: ${id}`
      );
      return result(null, res);
    });
  },
  deleteById: async (table, id, result) => {
    sql.query(`DELETE FROM ${table} WHERE id = ?`, id, (error, res) => {
      if (error) {
        console.log(error);
        return result(null, error);
      }

      if (res.affectedRows === 0) return result({ kind: "not_found" }, null);

      console.log(
        `Deleted ${res.affectedRows} items from ${table} with id: ${id}`
      );
      return result(null, res);
    });
  },
};

module.exports = query;
