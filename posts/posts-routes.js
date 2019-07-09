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
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    !post.length
      ? res.status(404).json({ message: "Post not found" })
      : res.status(200).json(post);
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

router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        message: "Post does not exist"
      });
    }

    if (!text) {
      res.status(400).json({
        message: "Please text is required"
      });
    } else {
      const postMsg = await Post.insertComment({
        post_id: id,
        text
      });
      res.status(201).json(postMsg);
    }
  } catch (err) {
    res.status(500).json({
      message: err.toString()
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  try {
    if (!post) {
      res.status(404).json({
        message: "Post not found"
      });
    } else {
      const archive = await Post.remove(id);
      console.log(archive);
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({
      message: "Cannot find comment"
    });
  }
});

module.exports = router;
