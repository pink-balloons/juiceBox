const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.get("/", async (req, res) => {
  try {
    const tags = await getAllTags();

    res.send({
      tags,
    });
  } catch (err) {
    console.log(err);
  }
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;
  // read the tagname from the params
  try {
    // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
    const posts = await getPostsByTagName(tagName);
    if (posts) {
      res.send(posts);
    } else {
      next({ name: "error", massage: "maybe next time " });
    }
  } catch ({ name, message }) {
    // forward the name and message to the error handler
    next({ name, massage });
  }
});

module.exports = tagsRouter;
