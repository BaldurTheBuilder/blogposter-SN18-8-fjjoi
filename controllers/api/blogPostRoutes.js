const router = require('express').Router();
const { BlogPost } = require('../../models');
// dashboard-related requirements
  // WHEN I click on the button to create a new blog post the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
  // WHEN I click on one of my existing posts in the dashboard I am able to delete or update my post and taken back to an updated dashboard
  // WHEN I click on the button to add a new blog post I am prompted to enter both a title and contents for my blog post
  // WHEN I click on the dashboard option in the navigation I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

  //create blogpost
  router.post('/', async (req, res) => {
    try {
        const postData = await BlogPost.create({
            title: req.body.title,
            contents: req.body.contents,
            user_id: req.session.user_id
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
  })

module.exports = router;