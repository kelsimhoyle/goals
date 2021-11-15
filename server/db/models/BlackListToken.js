const query = require("../util/query");
const sql = require("../util/db");

class BlackListToken {
    constructor(token) {
        this.token = token.token;
    }

    static create(token, result) {
        return query.insert("blacklist_token", token, result)
    }

    static getByToken(token, result) {
        sql.query(`SELECT * FROM blacklist_token WHERE token = ?`, token, (error, res) => {
            if (error) return result(error, null);

            if (res.length === 0) return result({type: "not_found"}, res);

            return result(null, res);
        })
    }


}

module.exports = BlackListToken;