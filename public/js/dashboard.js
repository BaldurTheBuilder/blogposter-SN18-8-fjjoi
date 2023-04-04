$(() => {
  // WHEN I click on the button to create a new blog post the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
  const createPost = async (event) => {
    event.preventDefault();
    const postTitle = $("#post-title").val().trim();
    const postContents = $("#post-contents").val().trim();
    if (!postTitle || !postContents) {
      alert("please have both a title and a post body.");
      return;
    }

    const response = await fetch("/api/blogposts", {
      method: "POST",
      body: `{"title": "${postTitle}", "contents": "${postContents}"}`,
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Post created.");
      location.reload();
    } else alert("error creating a post.");
  };

  const revealNewPost = () => {
    $("#hidden-div").removeClass("visually-hidden");
  };

  $("#reveal-new-post-btn").click(revealNewPost);
  $("#new-post-form").submit(createPost);
});
