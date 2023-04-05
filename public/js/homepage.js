$(() => {
  async function createComment(event) {
    event.preventDefault();
    const commentContents = $(this).children(1).val().trim();
    const blogPost_id = $(this).data("blog_id");
    if (!commentContents) {
      alert("please compose a comment.");
      return;
    }

    const response = await fetch("/api/comments", {
      method: "POST",
      body: `{"contents": "${commentContents}", "blogPost_id": "${blogPost_id}"}`,
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("comment created.");
      location.reload();
    } else alert("error creating a post.");
  }

  function revealExistingPost() {
    $(this).find("*").removeClass("visually-hidden");
  }

  $("div[id^='post']").click(revealExistingPost);
  $("form[id^='comment-form']").submit(createComment);
});