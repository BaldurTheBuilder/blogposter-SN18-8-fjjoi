const router = require("express").Router();
const { Comment } = require("../../models");

// create a comment
router.post("/", async (req, res) => {
  if (req.session.logged_in) {
    try {
      Comment.create({
        contents: req.body.contents,
        user_id: req.session.user_id,
        blogPost_id: req.body.blogPost_id,
        // date_created defaults to now
      }).then((results) => res.status(200).json(results));
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    res.status(401).json({ message: "Please log in to post a comment." });
    return;
  }
});

// update a comment
router.put("/:id", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const commentData = await Comment.findByPk(req.params.id);
      if (!commentData) {
        res
          .status(404)
          .json({ message: "Unable to update the requested comment." });
        return;
      }

      const serializedComment = commentData.get({ plain: true });
      if (serializedComment.user_id !== req.session.user_id) {
        res
          .status(401)
          .json({ message: "Unable to update the requested comment." });
        return;
      }

      const updateComment = await Comment.update(
        { contents: req.body.contents },
        { where: { id: req.params.id } }
      );
      res.status(200).json(updateComment);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({ message: "Please log in to update a comment." });
    return;
  }
});

// delete a comment
router.delete("/:id", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const commentData = await Comment.findByPk(req.params.id);
      if (!commentData) {
        res
          .status(404)
          .json({ message: "Unable to delete the requested comment." });
        return;
      }

      const serializedComment = commentData.get({ plain: true });
      if (serializedComment.user_id !== req.session.user_id) {
        res
          .status(401)
          .json({ message: "Unable to delete the requested comment." });
        return;
      }
      const destroyComment = await Comment.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(destroyComment);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({ message: "Please log in to delete a comment." });
    return;
  }
});

module.exports = router;
