$(() => {
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
  };

  /* <form id="login-form">
    <input type="username" id="login-username" placeholder="username">
    <input type="password" id="login-password" placeholder="password">
    <button type="submit" id="login-btn">Log in</button>
</form>

<form id="signup-form">
    <input type="username" id="signup-username" placeholder="username">
    <input type="password" id="signup-password" placeholder="password">
    <button type="submit" id="signup-btn">Sign up</button>
</form> */

  $("#login-form").submit(login);
  $("#signup-form").submit(signup);
});
