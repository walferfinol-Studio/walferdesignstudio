document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  function getCurrentPage() {
    let page = window.location.pathname.split("/").pop();
    if (!page || page === "/") page = "index.html";
    return page;
  }

  function setActiveMenu() {
    const currentPage = getCurrentPage();

    document.querySelectorAll(".links a").forEach(link => {
      const linkPage = link.getAttribute("href");

      link.classList.remove("active");

      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });
  }

  function enableMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const links = document.querySelector("#nav-links");

    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      toggle.textContent = links.classList.contains("open") ? "×" : "☰";
    });
  }

  function enablePageTransitions() {
    document.body.classList.add("page-loaded");

    document.querySelectorAll("a").forEach(link => {
      const href = link.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("http") ||
        link.target === "_blank"
      ) return;

      link.addEventListener("click", e => {
        e.preventDefault();
        document.body.classList.remove("page-loaded");
        document.body.classList.add("page-exit");

        setTimeout(() => {
          window.location.href = href;
        }, 220);
      });
    });
  }

  if (header) {
    fetch("/header.html")
      .then(res => res.text())
      .then(html => {
        header.innerHTML = html;
        setActiveMenu();
        enableMobileMenu();
        enablePageTransitions();
      });
  }

  if (footer) {
    fetch("/footer.html")
      .then(res => res.text())
      .then(html => {
        footer.innerHTML = html;

        const year = document.getElementById("year");
        if (year) year.textContent = new Date().getFullYear();
      });
  }
});
