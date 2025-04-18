const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Videos = require("./videos.model.js")(sequelize, Sequelize);
db.Styles = require("./styles.model.js")(sequelize, Sequelize);

db.Videos.belongsTo(db.Styles, { foreignKey: 'style_id', targetKey: 'id' });

module.exports = db;
