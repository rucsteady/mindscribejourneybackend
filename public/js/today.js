$(document).ready(() => {
  $("#modal-button").click(() => {
    $.get("/likes?format=json", (data) => {
      data.forEach((like) => {
        $(".modal-body").append(
          `<div>
            <span class="course-title">
            ${like.name}
            </span>
            </div>`
        );
      });
    });
  });
});
