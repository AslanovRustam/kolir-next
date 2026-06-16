/* =========================================================================
   Sticky-стек карток портфоліо (.hcases) — повтор ефекту зі сторінки support.
   Картки залипають (CSS position:sticky зі staggered top), а JS на скролі
   рахує прогрес наїзду наступної картки й пише змінні --hc-stack-*.
   (Узято напряму зі статичного assets/js/animations.js.)
   ========================================================================= */
(function () {
  'use strict';

  function initHcaseStack() {
    var section = document.querySelector('.hcases');
    var list = section ? section.querySelector('.hcases-list') : null;
    var cards = list ? Array.prototype.slice.call(list.querySelectorAll('.hcase-card')) : [];
    if (!section || cards.length < 2 || section.dataset.stackReady === '1') return;
    section.dataset.stackReady = '1';

    var mq = window.matchMedia('(min-width: 1001px)');
    var raf = 0;
    function clamp(v, a, b) { return Math.min(Math.max(v, a), b); }

    function stickyTopPx() {
      // має збігатися з top першої картки (9rem) у поточних px
      var fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 10;
      return 9 * fs;
    }

    function update() {
      raf = 0;
      if (!mq.matches) {
        cards.forEach(function (c) {
          c.style.removeProperty('--hc-stack-scale');
          c.style.removeProperty('--hc-stack-y');
          c.style.removeProperty('--hc-stack-dim');
        });
        return;
      }
      var top = stickyTopPx();
      var startOffset = Math.min(window.innerHeight * 0.34, 280);
      cards.forEach(function (card, i) {
        var next = cards[i + 1];
        var p = 0;
        if (next) {
          var nextTop = next.getBoundingClientRect().top;
          p = clamp((top + startOffset - nextTop) / startOffset, 0, 1);
        }
        card.style.setProperty('--hc-stack-scale', (1 - p * 0.028).toFixed(4));
        card.style.setProperty('--hc-stack-y', (-p * 10).toFixed(2) + 'px');
        card.style.setProperty('--hc-stack-dim', (p * 0.07).toFixed(4));
      });
    }
    function requestUpdate() { if (raf) return; raf = window.requestAnimationFrame(update); }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('orientationchange', requestUpdate);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(requestUpdate).catch(function () {});
    }
    requestUpdate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHcaseStack);
  } else {
    initHcaseStack();
  }
})();
