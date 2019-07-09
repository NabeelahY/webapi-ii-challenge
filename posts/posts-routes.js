const express = require("express");
const Post = require("./db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the hubs"
    });
  }
});

module.exports = router;
