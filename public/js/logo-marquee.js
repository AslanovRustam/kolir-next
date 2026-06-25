/* =========================================================================
   Безшовна бігуча строка логотипів («Нам довіряють»).
   Трек = 2 копії набору ([...LOGOS, ...LOGOS]). Анімація зсуває на var(--shift).
   Раніше --shift був хардкод 800px і НЕ збігався з шириною однієї копії →
   на циклі смикало. Рахуємо точний зсув = offsetLeft першого елемента ДРУГОЇ
   копії (= ширина однієї копії з трейлінг-гепом) → translateX(-shift) ставить
   2-гу копію рівно на місце 1-ї → шов невидимий. Перераховуємо на ресайз/шрифти.
   ========================================================================= */
(function () {
  'use strict';

  function init() {
    var track = document.getElementById('logosTrack');
    if (!track || track.dataset.marqueeReady === '1') return;
    var items = track.querySelectorAll('.logo-item');
    if (items.length < 2) return;
    track.dataset.marqueeReady = '1';

    // Зсув = ширина ОДНІЄЇ копії набору. copyLen = к-ть лого в одній копії
    // (data-copy-len). Фолбек на половину треку (старе припущення «2 копії»).
    var copyLen = parseInt(track.getAttribute('data-copy-len') || '', 10);
    if (!(copyLen > 0) || copyLen >= items.length) copyLen = Math.floor(items.length / 2);

    function update() {
      var shift = items[copyLen].offsetLeft - items[0].offsetLeft;
      if (shift > 0) track.style.setProperty('--shift', shift + 'px');
    }

    update();
    // повторні заміри — після відмальовки SVG/шрифтів
    requestAnimationFrame(update);
    setTimeout(update, 300);
    window.addEventListener('load', update);
    window.addEventListener('resize', update);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(update).catch(function () {});
    }
    if (window.ResizeObserver) {
      new window.ResizeObserver(update).observe(track);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
