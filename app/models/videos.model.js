module.exports = (sequelize, Sequelize) => {
  const Videos = sequelize.define("videos", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    style_id: {
      type: Sequelize.INTEGER,
    },
    video_url: {
      type: Sequelize.STRING,
    },
    author_name: {
      type: Sequelize.STRING,
    },
    caption: {
      type: Sequelize.STRING,
    },
    hashtag: {
      type: Sequelize.STRING,
    },
    likes: {
      type: Sequelize.INTEGER,
    },
  });

  return Videos;
};
