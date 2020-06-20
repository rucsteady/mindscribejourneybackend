$(document).ready(() => {
  $("#modal-button").click(() => {
    $.get("/api/likes", (results = {}) => {
      let data = results.data;
      if (!data || !data.likes) return;
      data.likes.forEach((like) => {
        $(".modal-body").append(
          `<div>
      <span class="like-title">
      ${like.name}
      </span>      
      </div>`
        );
      });
    });
  });
});
