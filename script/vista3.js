/* Che Puerco · Vista 3 (independiente) */

/* Pestañas del menú */
document.querySelectorAll('#tabs button').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('#tabs button').forEach(function (b) {
      b.setAttribute('aria-selected', b === btn);
    });
    document.querySelectorAll('.menu').forEach(function (m) {
      m.hidden = m.dataset.cat !== btn.dataset.cat;
    });
  });
});



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
