document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");

  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  if (header && !header.querySelector(".nav")) {
    header.innerHTML = `
      <nav class="nav">
        <div class="wrap inner">
          <a href="index.html" class="logo">
            <img src="assets/img/logo.png" alt="Walfer Design Studio" class="logo-img">
            <span>Walfer Design Studio</span>
          </a>

          <button class="menu-toggle" type="button" aria-label="Abrir menú">☰</button>

          <div class="links">
            <a href="index.html">Inicio</a>
            <a href="sobre-mi.html">Sobre mí</a>
            <a href="servicios.html">Servicios</a>
            <a href="portafolio.html">Portafolio</a>
            <a href="contacto.html">Contacto</a>
          </div>

          <a href="contacto.html" class="btn nav-cta">Hablemos</a>
        </div>
      </nav>
    `;
  }

  if (footer && !footer.innerHTML.trim()) {
    footer.innerHTML = `
      <div class="footer">
        <div class="wrap">
          © Walfer Design Studio
        </div>
      </div>
    `;
  }

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
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});
