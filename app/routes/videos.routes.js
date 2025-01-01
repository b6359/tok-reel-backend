module.exports = (app) => {
  const videos = require("../controllers/videos.controller.js");
  var router = require("express").Router();
  router.post("/", videos.getVideos);
  router.get("/styles", videos.getStyles);
  app.use("/videos", router);
};
