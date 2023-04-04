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

// dashboard
// dashboard includes a user's posts and the option to create new posts
router.get('/dashboard', async (req, res) => {
  if(req.session.logged_in) {
    try {  
      const blogPostData = await BlogPost.findAll({
        where: {
          user_id: req.session.user_id
        }
      });
      const blogPosts = blogPostData.map((post) => post.get({ plain: true }));
      
      res.render('dashboard', {
        // dashboard includes user's blog posts
          blogPosts,
          users,
          // currently defaulted to true for testing.
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