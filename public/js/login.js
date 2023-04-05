$(() => {
    // WHEN I revisit the site at a later time and choose to sign in I am prompted to enter my username and password
  const login = async (event) => {
    event.preventDefault();
    const username = $("#login-username").val().trim();
    const password = $("#login-password").val().trim();

    if(!username || !password) {
        alert('please complete the form.');
        return;
    }

    const response = await fetch("/api/users/login", {
      method: "POST",
      body: `{"username": "${username}", "password": "${password}"}`,
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log('logged in!');
      document.location = "/";
    } else alert("error logging in");
  };

  const signup = async (event) => {
    event.preventDefault();
    const username = $("#signup-username").val().trim();
    const password = $("#signup-password").val().trim();
    if(!username || !password || password.length < 8) {
        alert('please complete the form. Your password must be at least 8 characters.');
        return;
    }

    const response = await fetch("/api/users/signup", {
        method: "POST",
        body: `{"username": "${username}", "password": "${password}"}`,
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        console.log('user created and logged in!');
        document.location = "/";
      } else alert("error signing up.");
  };

  $("#login-form").submit(login);
  $("#signup-form").submit(signup);
});
