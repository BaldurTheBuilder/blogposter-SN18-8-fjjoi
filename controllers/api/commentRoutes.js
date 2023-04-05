const router = require('express').Router();
const { Comment } = require('../../models');

router.post("/", async (req, res) => {
    try {
      if(!req.session.logged_in) {
        res.render("login");
        return;
      }
      const commentData = await Comment.create({
        contents: req.body.contents,
        user_id: req.session.user_id,
        blogPost_id: req.body.blogPost_id
        // date_created defaults to now
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });

module.exports = router;