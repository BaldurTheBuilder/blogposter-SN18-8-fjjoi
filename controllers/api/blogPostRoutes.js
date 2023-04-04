const router = require("express").Router();
const { BlogPost } = require("../../models");

//create blogpost
router.post("/", async (req, res) => {
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
});

module.exports = router;
