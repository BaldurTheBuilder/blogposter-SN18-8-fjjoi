const router = require("express").Router();
const { User } = require("../../models");

// logout post
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else res.status(400).end();
});

// login post
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // check if a user exists
    if (!userData) {
      res.status(400);
      return;
    }
    const passwordCheck = userData.checkPassword(req.body.password);
    // check the password is valid
    if (!passwordCheck) {
      res.status(400);
      return;
    }
    // if valid, we save logged_in and user_id to session
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;
      res.json({ user: userData, message: "Logged in" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//signup post
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // check if a username already exists
    if (userData) {
      alert('please log in.');
      res.status(400);
      return;
    }
    // WHEN I click on the sign-up button my user credentials are saved and I am logged into the site
    User.create(req.body).then((newUser) => {
      req.session.save(() => {
        req.session.logged_in = true;
        req.session.user_id = newUser.id;
        res.json({ user: newUser, message: "User created and logged in" });
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
