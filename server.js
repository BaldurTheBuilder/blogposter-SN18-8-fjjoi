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
  cookie: {
    maxAge: 180000 //1000 milliseconds * 60 seconds * 30 minutes to expire
  },
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

// homepage-related requirements
  // WHEN I click on an existing blog post I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
  // WHEN I enter a comment and click on the submit button while signed in the comment is saved;
    // the post is updated to display the comment, the comment creator’s username, and the date created

// dashboard-related requirements
  // WHEN I click on one of my existing posts in the dashboard I am able to delete or update my post and am taken back to an updated dashboard

// general requirements (authentication, styling, etc.)
  // WHEN I am idle on the site for more than a set time I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
  // WHEN I revisit the site at a later time and choose to sign in I am prompted to enter my username and password
  // styling
  // confirm authentication is complete