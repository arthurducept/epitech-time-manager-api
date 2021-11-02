const Pool = require('pg').Pool;

exports.connectDB = function () {
  try {
    const pool = new Pool({
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      idleTimeoutMillis: 1,
    });
    return pool;
  } catch (err) {
    console.error(err);
    return err;
  }
};
