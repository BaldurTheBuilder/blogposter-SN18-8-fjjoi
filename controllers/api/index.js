const router = require('express').Router();
const blogPostRoutes = require('./blogPostRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/blogposts', blogPostRoutes);
router.use('/users', userRoutes);
router.user('/comments', commentRoutes);

module.exports = router;