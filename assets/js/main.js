/* ==========================================
   MAIN JS - WALFER DESIGN STUDIO
   Carga header/footer, menú mobile,
   enlaces activos y transiciones de página.
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

  /* ==========================================
     ELEMENTOS DINÁMICOS: HEADER Y FOOTER
  ========================================== */

  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  /* ==========================================
     FUNCIÓN: CARGAR HTML EXTERNO
     Carga header.html y footer.html.
  ========================================== */

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

  /* ==========================================
     CARGA DEL HEADER
  ========================================== */

await loadHTML(header, [
  "header.html?v=1.0.2",
  "./header.html?v=1.0.2",
  "components/header.html?v=1.0.2",
  "./components/header.html?v=1.0.2"
]);

  /* ==========================================
     CARGA DEL FOOTER
  ========================================== */

await loadHTML(footer, [
  "footer.html?v=1.0.2",
  "./footer.html?v=1.0.2",
  "components/footer.html?v=1.0.2",
  "./components/footer.html?v=1.0.2"
]);

  /* ==========================================
     ANIMACIÓN DE ENTRADA DE PÁGINA
     Activa la clase que muestra el body.
  ========================================== */

  document.body.classList.remove("page-exit");
  document.body.classList.add("page-loaded");

  /* ==========================================
     MENÚ MOBILE
     Abre/cierra el menú hamburguesa.
  ========================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".links");

  if (menuToggle && links) {
    menuToggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });

    /* ==========================================
       CERRAR MENÚ MOBILE AL HACER CLICK
       EN UN ENLACE DEL MENÚ.
    ========================================== */

    links.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
      });
    });
  }

  /* ==========================================
     ENLACE ACTIVO EN EL MENÚ
     Marca como activo el link de la página actual.
  ========================================== */

  const currentPath = window.location.pathname.toLowerCase();

  document.querySelectorAll(".links a").forEach(link => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    const text = (link.textContent || "").toLowerCase();

    link.classList.remove("active");

    if (
      currentPath.includes(href.replace(".html","")) ||
      currentPath.includes(text) ||
      (currentPath.endsWith("/") && href.includes("index"))
    ) {
      link.classList.add("active");
    }
  });

  /* ==========================================
     TRANSICIÓN ENTRE PÁGINAS
     Agrega page-exit antes de navegar.
  ========================================== */

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

        document.body.classList.remove("page-loaded");
        document.body.classList.add("page-exit");

        setTimeout(() => {
          window.location.href = link.href;
        }, 220);
      }
    });
  });

});

/* ==========================================
   FIX MOBILE / BACK BUTTON
   Evita pantalla en blanco al volver atrás.
   Especialmente útil en Safari iOS, Chrome Android
   y navegadores que usan Back Forward Cache.
========================================== */

window.addEventListener("pageshow", () => {
  document.body.classList.remove("page-exit");
  document.body.classList.add("page-loaded");
});

/* ==========================================
   FIX EXTRA: RESTAURAR VISIBILIDAD
   Si el navegador restaura la página desde caché,
   fuerza que el body vuelva a estar visible.
========================================== */

window.addEventListener("popstate", () => {
  document.body.classList.remove("page-exit");
  document.body.classList.add("page-loaded");
});
