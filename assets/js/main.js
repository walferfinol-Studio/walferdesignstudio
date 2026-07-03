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
});
/* ANIMACIONES / INTERACCIONES */

.logo{
  transition:opacity .25s ease, transform .25s ease;
}

.logo:hover{
  opacity:.9;
  transform:translateY(-1px);
}

.logo:hover .logo-img{
  transform:rotate(-6deg) scale(1.06);
  border-radius:10px;
  filter:drop-shadow(0 8px 18px rgba(255,179,71,.25));
}

.logo-img{
  transition:transform .25s ease, filter .25s ease, border-radius .25s ease;
}

.btn{
  transition:
    background .25s ease,
    color .25s ease,
    border-color .25s ease,
    transform .18s ease,
    box-shadow .25s ease;
}

.btn:hover{
  transform:translateY(-2px);
}

.btn:active{
  transform:translateY(0);
}

.btn.ghost:hover{
  background:rgba(255,255,255,.10);
  border-color:rgba(255,255,255,.35);
  color:#fff;
  box-shadow:0 10px 28px rgba(0,0,0,.22);
}

.btn.brand:hover,
.nav-cta:hover{
  background:linear-gradient(135deg,var(--accent),var(--brand));
  color:#080A0F;
  box-shadow:0 16px 42px rgba(0,212,255,.22);
}

.card,
.stat,
.project{
  transition:transform .25s ease, border-color .25s ease, box-shadow .25s ease;
}

.card:hover,
.stat:hover,
.project:hover{
  transform:translateY(-4px);
  border-color:rgba(255,255,255,.22);
  box-shadow:0 26px 70px rgba(0,0,0,.32);
}

/* TRANSICIÓN ENTRE PÁGINAS */

body{
  opacity:0;
  transform:translateY(10px);
  transition:opacity .35s ease, transform .35s ease;
}

body.page-loaded{
  opacity:1;
  transform:translateY(0);
}

body.page-exit{
  opacity:0;
  transform:translateY(-10px);
}
