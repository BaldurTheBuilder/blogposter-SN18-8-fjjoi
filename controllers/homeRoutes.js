const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");
// const withAuth = require('../utils/auth');

//home page
// WHEN I click on the homepage option in the navigation I am taken to the homepage and presented with existing blog posts that include the post title and the date created
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    const users = userData.map((project) => project.get({ plain: true }));

    const blogPostData = await BlogPost.findAll({
      include: [
        { model: User, attributes: {exclude: ['password']} }, 
        {model: Comment, include: {model: User, attributes: {exclude: ['password']}}}],
    });
    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      blogPosts,
      users,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// dashboard
// WHEN I click on any other links in the navigation I am prompted to either sign up or sign in
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
