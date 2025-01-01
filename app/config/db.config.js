const secret = require('./secrets.json');
module.exports = {
  HOST: secret.DB_HOST,
  USER: secret.DB_USER,
  PASSWORD: secret.DB_PASSWORD,
  DB: secret.DB_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
