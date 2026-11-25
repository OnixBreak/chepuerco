
/* Che Puerco · Vista 2 */

/* Pestañas del menú */
const tabButtons = document.querySelectorAll('#tabs button');
const menus = document.querySelectorAll('.menu');

tabButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    tabButtons.forEach(function (button) {
      button.setAttribute('aria-selected', button === btn ? 'true' : 'false');
    });

    menus.forEach(function (menu) {
      menu.hidden = menu.dataset.cat !== btn.dataset.cat;
    });
  });
});


/* Ocultar y mostrar navegación al hacer scroll */
let lastScrollTop = 0;
const nav = document.querySelector('nav');

if (nav) {
  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Bajando
      nav.style.top = '-100px';
    } else {
      // Subiendo
      nav.style.top = '0';
    }

    lastScrollTop = Math.max(0, scrollTop);
  }, { passive: true });
}


/* Sucursales */
document.querySelectorAll('.suc').forEach(function (suc) {
  suc.querySelector('.suc-head').addEventListener('click', function () {
    document.querySelectorAll('.suc').forEach(function (s) {
      s.classList.toggle('is-active', s === suc);
    });
    document.getElementById('mapa').src =
  'https://www.google.com/maps?q=' + encodeURIComponent(suc.dataset.q || suc.dataset.lat + ',' + suc.dataset.lng) +
  '&ll=' + suc.dataset.lat + ',' + suc.dataset.lng + '&z=17&hl=es&output=embed';
  });
});

/* Compartir ruta: menú nativo del celular; si no existe, copia el enlace */
document.querySelectorAll('[data-share]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (navigator.share) {
      navigator.share({ title: 'Che Puerco', text: 'Cómo llegar a Che Puerco', url: btn.dataset.url }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(btn.dataset.url).then(function () { alert('Enlace copiado'); });
    } else {
      prompt('Copia el enlace:', btn.dataset.url);
    }
  });
});


/* Compartir ruta */
document.querySelectorAll('[data-share]').forEach(function (btn) {
  btn.addEventListener('click', async function () {
    const url = btn.dataset.url;

    if (!url) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Che Puerco',
          text: 'Cómo llegar a Che Puerco',
          url: url
        });
      } catch (error) {
        // El usuario canceló o no se pudo compartir.
      }

    } else if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        alert('Enlace copiado');
      } catch (error) {
        prompt('Copia el enlace:', url);
      }

    } else {
      prompt('Copia el enlace:', url);
    }
  });
});
