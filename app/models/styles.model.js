module.exports = (sequelize, Sequelize) => {
  const Styles = sequelize.define("styles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    style_name: {
      type: Sequelize.STRING,
    },
    style_image: {
      type: Sequelize.STRING,
    },
  });

  return Styles;
};
