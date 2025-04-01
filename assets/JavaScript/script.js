const proceedForm = document.getElementById("proceedForm");
const proceedButton = document.getElementById("proceedButton");
proceedForm.addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = "benchmark-page.html";
});
