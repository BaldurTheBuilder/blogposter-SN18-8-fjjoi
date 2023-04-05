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

  async function deletePost(event) {
    event.preventDefault();
    console.log('made it past the button')
    const blogPost_id = $(this).data("post_id");
    const response = await fetch(`/api/blogposts/${blogPost_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to delete the blogpost.");
    }
  }

async function updatePost(event) {
  event.preventDefault();
  const blogPost_id = $(this).data("post_id");
  const postTitle = $(this).children(0).val().trim();
  const postContents = $(this).children(1).val().trim();
  if (!postTitle || !postContents) {
    alert("please have both a title and a post body.");
    return;
  }

  // WHEN I click on one of my existing posts in the dashboard I am able to delete or update my post and am taken back to an updated dashboard
  const response = await fetch(`/api/blogposts/${blogPost_id}`, {
    method: "PUT",
    body: `{"title": "${postTitle}", "contents": "${postContents}"}`,
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("Post updated.");
    location.reload();
  } else alert("error updating a post.");
}

  const revealNewPost = () => {
    $("#hidden-div").removeClass("visually-hidden");
  };

  function revealExistingPost () {
    $(this).find('*').removeClass("visually-hidden");
  };

  $("#new-post-form").submit(createPost);
  $("button[id^='del-post-btn']").click(deletePost);
  $("#reveal-new-post-btn").click(revealNewPost);
  $("div[id^='individual-post']").click(revealExistingPost);
  $("form[id^='edit-post-form']").submit(updatePost);
});