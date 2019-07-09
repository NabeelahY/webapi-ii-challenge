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

router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    }
  });

module.exports = router;
