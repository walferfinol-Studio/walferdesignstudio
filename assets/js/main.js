document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  async function loadHTML(element, paths) {
    if (!element || element.innerHTML.trim()) return;

    for (const path of paths) {
      try {
        const res = await fetch(path);
        if (res.ok) {
          element.innerHTML = await res.text();
          return;
        }
      } catch (e) {}
    }
  }

  await loadHTML(header, [
    "header.html",
    "./header.html",
    "components/header.html",
    "./components/header.html"
  ]);

  await loadHTML(footer, [
    "footer.html",
    "./footer.html",
    "components/footer.html",
    "./components/footer.html"
  ]);

  document.body.classList.add("page-loaded");

  const menuToggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".links");

  if (menuToggle && links) {
    menuToggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });

    links.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
      });
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".links a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    const linkPage = href.split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.target === "_blank"
    ) return;

    link.addEventListener("click", e => {
      const url = new URL(link.href);

      if (url.hostname === window.location.hostname) {
        e.preventDefault();
        document.body.classList.add("page-exit");

        setTimeout(() => {
          window.location.href = link.href;
        }, 220);
      }
    });
  });
});
