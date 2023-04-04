const router = require('express').Router();
const { User } = require('../../models');

// logout post

// login post
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        // check if a user exists
        if(!userData) {
            res.status(400);
            return;
        }
        const passwordCheck = userData.checkPassword(req.body.password);
        // check the password is valid
        if(!passwordCheck) {
            res.status(400);
            return;
        }
        // if valid, we save logged_in and user_id to session
        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userData.id;
            res.json({user: userData, message: "Logged in"});
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//sign up post

module.exports = router;