$(() => {
    function revealExistingPost () {
        $(this).find('*').removeClass("visually-hidden");
      };

      
    $("div[id^='post']").click(revealExistingPost);
});