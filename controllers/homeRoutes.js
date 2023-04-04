const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");
// const withAuth = require('../utils/auth');

//home page
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    const users = userData.map((project) => project.get({ plain: true }));

    const blogPostData = await BlogPost.findAll({
      include: [{ model: User }],
    });
    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      blogPosts,
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// WHEN I click on any other links in the navigation I am prompted to either sign up or sign in
// dashboard
router.get("/dashboard", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const blogPostData = await BlogPost.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
      const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

      res.render("dashboard", {
        blogPosts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.render("login");
  }
});

//login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
