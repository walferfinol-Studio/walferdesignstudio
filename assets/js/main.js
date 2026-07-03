
const year = document.querySelector('#year'); if(year) year.textContent = new Date().getFullYear();
document.querySelectorAll('[data-scroll]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});}));
