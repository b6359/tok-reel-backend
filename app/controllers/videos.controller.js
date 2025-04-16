const db = require("../models");
const API = require("../helper/API_Response");
const db_helper = require("../helper/db_helper");
const helper = require("../helper/helper");
exports.getVideos = async (req, res) => {
  const { page = 1, limit = 1, style_id } = req.body;
  const whereCondition = {};
  if (style_id) {
    whereCondition.style_id = style_id; 
  }
  const user = await db.Videos.findAndCountAll({
    where: whereCondition,
    include: [{
      model: db.Styles,
      attributes: ['id', 'style_name']
    }],
    limit: limit, 
    order: db.Sequelize.literal('RAND()'),
    offset: (page - 1) * limit,
  });
  res.status(200).send(API._200(user));
};
exports.getStyles = async (req, res) => {
  const styles = await db.Styles.findAll();
  res.status(200).send(API._200(await styles));
};
