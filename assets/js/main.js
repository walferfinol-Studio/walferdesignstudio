document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  function setActiveMenu() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".links a").forEach(link => {
      const linkPage = link.getAttribute("href");

      if (linkPage === currentPage) {
        link.classList.add("active");
      }
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
      ) {
        return;
      }

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
      .then(response => response.text())
      .then(data => {
        header.innerHTML = data;
        setActiveMenu();
        enablePageTransitions();
      });
  } else {
    setActiveMenu();
    enablePageTransitions();
  }

  if (footer) {
    fetch("/footer.html")
      .then(response => response.text())
      .then(data => {
        footer.innerHTML = data;

        const year = document.getElementById("year");
        if (year) {
          year.textContent = new Date().getFullYear();
        }
      });
  }
});
