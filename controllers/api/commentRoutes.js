const router = require("express").Router();
const { Comment } = require("../../models");

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
    res.status(401).json({message: "Please log in to post a comment."});
    return;
  }
});

module.exports = router;
