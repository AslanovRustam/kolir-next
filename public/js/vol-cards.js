/* Картки «Робимо все» (волонтери): нескінченний вертикальний слайдер з авто-
   листанням, стрілками та крапками. Клонуємо набір карток ДО і ПІСЛЯ оригіналів
   → петля без стрибка: після 4-ї знову з’являється 1-ша (і навпаки). Після того
   як анімація доходить до клону — безшумно «рецентруємось» у середній набір.
   Клони ховаються на мобілці (там просто стопка). Гард volCardsReady — щоб не
   дублювати слайдер на повторний інжект скрипта при SPA-навігації. */
(function () {
  'use strict';

  function initVolCards() {
    var win = document.querySelector('.vol-cards');
    var track = win && win.querySelector('.vol-cards-track');
    if (!win || !track || track.dataset.volCardsReady === '1') return;
    track.dataset.volCardsReady = '1';

    var originals = Array.prototype.slice.call(track.querySelectorAll('.vol-card'));
    var realCount = originals.length;
    if (realCount < 2) return;

    var dots = Array.prototype.slice.call(document.querySelectorAll('.vol-cards-dot'));
    var prev = document.querySelector('.vol-cards-prev');
    var next = document.querySelector('.vol-cards-next');

    // Три набори карток у треку: [клони] [оригінали] [клони]. Стартуємо з
    // середнього набору, тож є запас і вгору, і вниз для безшовної петлі.
    var before = document.createDocumentFragment();
    var after = document.createDocumentFragment();
    originals.forEach(function (c) {
      var b = c.cloneNode(true); b.classList.add('vol-card--clone'); b.setAttribute('aria-hidden', 'true'); before.appendChild(b);
      var a = c.cloneNode(true); a.classList.add('vol-card--clone'); a.setAttribute('aria-hidden', 'true'); after.appendChild(a);
    });
    track.insertBefore(before, track.firstChild);
    track.appendChild(after);

    var all = Array.prototype.slice.call(track.querySelectorAll('.vol-card'));
    var pos = realCount; // індекс першого оригіналу (середній набір)

    function isMobile() { return window.matchMedia('(max-width: 1000px)').matches; }
    function realIndex() { return ((pos - realCount) % realCount + realCount) % realCount; }

    function apply(animate) {
      if (isMobile()) { track.style.transform = ''; track.style.transition = ''; return; }
      if (!animate) track.style.transition = 'none';
      var shift = all[pos].offsetTop - all[0].offsetTop;
      track.style.transform = 'translateY(' + (-shift) + 'px)';
      if (!animate) {
        void track.offsetHeight; // примусовий рефлоу → скидаємо transition без анімації
        track.style.transition = '';
      }
      var ri = realIndex();
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === ri); });
    }

    // Після завершення анімації, якщо ми вийшли за межі середнього набору —
    // повертаємось у нього на ідентичну візуальну позицію (без анімації).
    function recenter() {
      if (pos < realCount || pos >= realCount * 2) {
        pos = realCount + realIndex();
        apply(false);
      }
    }
    track.addEventListener('transitionend', function (e) {
      if (e.propertyName === 'transform') recenter();
    });

    function go(delta) { pos += delta; apply(true); }

    var AUTO = 4500, timer = null;
    function play() { stop(); if (!isMobile()) timer = window.setInterval(function () { go(1); }, AUTO); }
    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
    function bump(fn) { return function () { fn(); play(); }; }

    if (prev) prev.addEventListener('click', bump(function () { go(-1); }));
    if (next) next.addEventListener('click', bump(function () { go(1); }));
    dots.forEach(function (d, i) {
      d.addEventListener('click', bump(function () { pos = realCount + i; apply(true); }));
    });

    var hoverZone = win.closest('.vol-cards-wrap') || win;
    hoverZone.addEventListener('mouseenter', stop);
    hoverZone.addEventListener('mouseleave', play);

    window.addEventListener('resize', function () { apply(false); });
    apply(false);
    play();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVolCards);
  } else {
    initVolCards();
  }
})();
