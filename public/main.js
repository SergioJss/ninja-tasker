const listItem = document.querySelector("ul");

listItem.addEventListener("click", function(event) {
  console.log(event.target);
  fetch("/delete/" + event.target.id, { method: "delete" })
    .then(function(res) {
      res.json();
    })
    .then(function() {
      window.location.href = "/home";
      event.target.parentNode.removeChild(event.target);
    });
});
