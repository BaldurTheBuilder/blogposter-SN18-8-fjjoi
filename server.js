// AS A developer who writes about tech
// I WANT a CMS-style blog site SO THAT I can publish articles, blog posts, and my thoughts and opinions
// GIVEN a CMS-style blog site

// WHEN I visit the site for the first time
// THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
    //homepage has existing blog posts, a login button, and nav links to: homepage, dashboard (handlebars)

// WHEN I click on the homepage option I am taken to the homepage
    //homepage button brings to homepage (handlebars)

// WHEN I click on any other links in the navigation I am prompted to either sign up or sign in
    //if not logged in and other nav buttons/links taken, redirected to login/sign up page (handlebars, server, authentication)

// WHEN I choose to sign up I am prompted to create a username and password
    //sign up form has fields for a username and password (handlebars)
    //users have usernames and passwords (models)

// WHEN I click on the sign-up button my user credentials are saved and I am logged into the site
    //sign-up button on login/signup page posts a user (controllers/userRoutes)
    //sign-up button on login/signup page logs the user in (cookies? authentication?)

// WHEN I revisit the site at a later time and choose to sign in I am prompted to enter my username and password
    //session memory only saves login data for current session (session memory, authentication)

// WHEN I am signed in to the site I see navigation links for the homepage, the dashboard, and the option to log out
    //login button replaced with logout button when logged in (handlebars, session memory/authentication)

// WHEN I click on the homepage option in the navigation I am taken to the homepage and presented with existing blog posts that include the post title and the date created
    //homepage shows blog posts
    //blogposts shown on homepage include a title and date created

// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
    //can click on blogposts to see post information and an option to leave a comment
    //blogposts have: title, contents, creator (foreignKey to user), and date created
    //comments have foreignKeys to blogposts

// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
    //comment field includes a text area and a submit button
    //submit button saves comment, post adds comment
    //comments have: creator (foreignkey to user), contents, and date created

// WHEN I click on the dashboard option in the navigation
// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
    //dashboard button shows current logged in user's posts
    //dashboard button shows option to add new posts

// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post
    //new post button has prompts for title and contents


// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
    //new post button posts to BlogPost
    //new post button redirects to updated dashboard with new post

// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard
    //existing blogposts on the dashboard have buttons for delete and update
    //delete and update run delete and put routes
    //delete and update reload an updated dashboard

// WHEN I click on the logout option in the navigation
// THEN I am signed out of the site
    //logout button signs out

// WHEN I am idle on the site for more than a set time
// THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
    //cookie forces timeout so user has to log back in after an hour