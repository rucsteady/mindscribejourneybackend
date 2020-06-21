$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/api/likes", (results = {}) => {
      let data = results.data;
      if (!data || !data.likes) return;
      data.likes.forEach((like) => {
        $(".modal-body").append(
          `<div>
      <span class="like-title">
      ${like.name}
      </span>      
      <button class="join-button" data-id="${like._id}">
      <button class="${
        like.joined ? "joined-button" : "join-button"
      } btn btn-info btn-sm" data-id="${like._id}">
      ${like.joined ? "Joined" : "Join"}
        </button>  
      </div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();
    });
  });
});

let addJoinButtonListener = () => {
  $(".join-button").click((event) => {
    let $button = $(event.target),
      likeId = $button.data("id");
    $.get(`/api/likes/${likeId}/join`, (result = {}) => {
      let data = result.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};
