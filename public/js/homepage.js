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
      body: `{"contents": "${postContents}", "blogPost_id": "${blogPost_id}"}`,
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Post created.");
      location.reload();
    } else alert("error creating a post.");
  }

  function revealExistingPost() {
    $(this).find("*").removeClass("visually-hidden");
  }

  $("div[id^='post']").click(revealExistingPost);
  $("form[id^='comment-form']").submit(createComment);
});

// <form id="comment-form-{{blogPost.id}}">
//     <p>Leave a Comment:</p>
//     <textarea id="comment-contents-{{blogPost.id}}" data-id="" placeholder="comment"></textarea>
//     <button type="submit" id="comment-submit-btn-{{blogPost.id}}">Submit Comment</button>
// </form>

// user_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'user',
//       key: 'id',
//     },
//   },
// blogPost_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'blogPost',
//       key: 'id',
//     },
// }
