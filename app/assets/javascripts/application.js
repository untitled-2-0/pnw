document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-toast]");
  if (!button) return;

  const toast = document.querySelector(".toast");
  if (!toast) return;

  toast.textContent = button.dataset.toast;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
});
