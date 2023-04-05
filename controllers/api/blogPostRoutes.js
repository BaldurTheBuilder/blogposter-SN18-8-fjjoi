const router = require("express").Router();
const { BlogPost, Comment, User } = require("../../models");

// create blogpost
router.post("/", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const postData = await BlogPost.create({
        title: req.body.title,
        contents: req.body.contents,
        user_id: req.session.user_id,
        // date_created defaults to now
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  } else {
    res.status(401).json({ message: "Please log in to create a post." });
    return;
  }
});

// delete blogpost
router.delete("/:id", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const postData = await BlogPost.findByPk(req.params.id);
      if (!postData) {
        res
          .status(404)
          .json({ message: "Unable to delete the requested blogpost." });
        return;
      }

      const serializedPost = postData.get({ plain: true });
      if (serializedPost.user_id !== req.session.user_id) {
        res
          .status(401)
          .json({ message: "Unable to delete the requested blogpost." });
        return;
      }
      const destroyPost = await BlogPost.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(destroyPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({ message: "Please log in to delete a post." });
    return;
  }
});

// update blogpost
router.put("/:id", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const postData = await BlogPost.findByPk(req.params.id);
      if (!postData) {
        res
          .status(404)
          .json({ message: "Unable to update the requested blogpost." });
        return;
      }

      const serializedPost = postData.get({ plain: true });
      if (serializedPost.user_id !== req.session.user_id) {
        res
          .status(401)
          .json({ message: "Unable to update the requested blogpost." });
        return;
      }
      const updatePost = await BlogPost.update(
        { title: req.body.title, contents: req.body.contents },
        { where: { id: req.params.id } }
      );
      res.status(200).json(updatePost);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({ message: "Please log in to update a blogpost." });
    return;
  }
});

module.exports = router;
