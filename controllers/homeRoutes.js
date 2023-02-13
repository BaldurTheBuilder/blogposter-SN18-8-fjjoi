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
         logged_in: true//req.session.logged_in,
    }
    );
    } catch (err) {
        res.status(500).json(err);
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

//dashboard



module.exports = router;