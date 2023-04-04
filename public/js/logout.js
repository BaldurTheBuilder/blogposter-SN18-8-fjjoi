$(() => {
    // WHEN I click on the logout option in the navigation I am signed out of the site
    const logout = async (event) => {
      event.preventDefault();

      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        console.log('logged out!');
        document.location = "/";
      } else alert("error logging out.");
    };
  
    $("#logout-btn").click(logout);
  });