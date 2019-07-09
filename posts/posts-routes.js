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

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the post"
    });
  }
});

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        error: "Comment does not exist"
      });
    } else {
      const comment = await Post.findPostComments(id);
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(500).json({
      message: "Cannot find comment"
    });
  }
});

router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  try {
    if (!title || !contents) {
      res.status(400).json({
        message: "Please title and contents are required"
      });
    } else {
      const postMsg = await Post.insert({
        title,
        contents
      });
      res.status(201).json(postMsg);
    }
  } catch (err) {
    res.status(500).json({
      message: err.toString()
    });
  }
});

module.exports = router;
