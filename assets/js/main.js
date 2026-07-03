document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");

  const menuToggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".links");

  if (menuToggle && links) {
    menuToggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
      });
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".links a").forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    const linkPage = href.split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});
