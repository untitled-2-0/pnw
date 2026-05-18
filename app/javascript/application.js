document.addEventListener("turbo:load", () => {
  document.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => {
      const toast = document.querySelector(".toast");
      if (!toast) return;

      toast.textContent = button.dataset.toast;
      toast.classList.add("show");
      window.setTimeout(() => toast.classList.remove("show"), 2200);
    });
  });
});
