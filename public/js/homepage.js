$(() => {
  // WHEN I enter a comment and click on the submit button while signed in the comment is saved;
  // the post is updated to display the comment, the comment creator’s username, and the date created
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
      } else alert("Please log in to make a comment.");
  }

  function revealExistingPost() {
    $(this).find("*").removeClass("visually-hidden");
  }

  $("div[id^='post']").click(revealExistingPost);
  $("form[id^='comment-form']").submit(createComment);
});
