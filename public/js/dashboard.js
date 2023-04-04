$(() => {
/* <button type="button" id="reveal-new-post-btn">Create a new Post</button>
<div class="visually-hidden">
    <form data-user_id=""{{user_id}}>
        <h4>New Post</h4>
        <input type="Title" id="post-title" placeholder="Title">
        <textarea id="post-contents" placeholder="Post contents here"></textarea>
        <button type="submit" id="post-submit-btn">Submit Post</button>
    </form>
</div> */
const revealNewPost = () => {
    $('#hidden-div').removeClass('visually-hidden');
}

$('#reveal-new-post-btn').click(revealNewPost);
$('#new-post-form').submit(createPost);
});