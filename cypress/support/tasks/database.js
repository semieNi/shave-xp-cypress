const { Pool } = require("pg");

const dbConfig = {
  host: "motty.db.elephantsql.com",
  user: "vuwrapwm",
  password: "W2LDDKERN5EvT1WTm5G90rOBdk-HSjMh",
  database: "vuwrapwm",
  port: 5432,
};

module.exports = {
  removeUser(email) {
    return new Promise((resolve) => {
      const pool = new Pool(dbConfig);

      pool.query(
        "DELETE FROM users WHERE email = $1",
        [email],
        (error, result) => {
          if (error) {
            throw error;
          }
          resolve({ success: result });
        }
      );
    });
  },
};
