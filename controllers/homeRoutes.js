const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
// const withAuth = require('../utils/auth');

//home page
//homepage has existing blog posts, a login button, and nav links to: homepage, dashboard (handlebars)
router.get('/', /*withAuth,*/ async (req, res) => {
    try {
    const userData = await User.findAll({attributes: {exclude: ['password']}});
    const users = userData.map((project) => project.get({ plain: true }));

    const blogPostData = await BlogPost.findAll({
        include: [{model: User}]
    });
    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));
    
    res.render('homepage', {
        blogPosts,
        users,
        // currently defaulted to true for testing.
         logged_in: true//req.session.logged_in,
    }
    );
    } catch (err) {
        res.status(500).json(err);
    }
  });

// WHEN I click on any other links in the navigation I am prompted to either sign up or sign in
// dashboard
// dashboard includes a user's posts and the option to create new posts
router.get('/dashboard', async (req, res) => {
  //logged_in and user_id are preset for testing.

  if(/*req.session.logged_in*/true) {
    try {  
      const blogPostData = await BlogPost.findAll({
        where: {
          user_id: 1//req.session.user_id
        }
      });
      const blogPosts = blogPostData.map((post) => post.get({ plain: true }));
      
      res.render('dashboard', {
        // dashboard includes user's blog posts
          blogPosts,
           logged_in: true//req.session.logged_in,
      }
      );
      } catch (err) {
          res.status(500).json(err);
      }
  }
  else {
    res.render('login');
  }
});

  //login page
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

module.exports = router;