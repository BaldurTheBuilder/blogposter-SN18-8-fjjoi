const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
// WHEN I click on the button to add a new blog post I am prompted to enter both a title and contents for my blog post
// WHEN I click on the homepage option I am taken to the homepage
// WHEN I click on any other links in the navigation I am prompted to either sign up or sign in
// WHEN I choose to sign up I am prompted to create a username and password
// WHEN I click on the sign-up button my user credentials are saved and I am logged into the site
// WHEN I revisit the site at a later time and choose to sign in I am prompted to enter my username and password
// WHEN I click on the homepage option in the navigation I am taken to the homepage and presented with existing blog posts that include the post title and the date created
// WHEN I click on an existing blog post I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
// WHEN I enter a comment and click on the submit button while signed in the comment is saved;
    // the post is updated to display the comment, the comment creator’s username, and the date created
// WHEN I click on the dashboard option in the navigation I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
// WHEN I click on the button to create a new blog post the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
// WHEN I click on one of my existing posts in the dashboard I am able to delete or update my post and taken back to an updated dashboard
// WHEN I click on the logout option in the navigation I am signed out of the site
// WHEN I am idle on the site for more than a set time I am able to view comments but I am prompted to log in again before I can add, update, or delete comments