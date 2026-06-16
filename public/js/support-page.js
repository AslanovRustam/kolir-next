(() => {
  'use strict';

  function initSupportLogoCarousel() {
    const rail = document.getElementById('supportLogoRail');
    const track = document.getElementById('supportLogoTrack');
    const caption = document.getElementById('supportTrustedCaption');

    if (!rail || !track || track.dataset.supportCarouselReady === '1') return;
    track.dataset.supportCarouselReady = '1';

    track.style.removeProperty('visibility');
    track.style.removeProperty('pointer-events');

    const sourceItems = Array.from(track.querySelectorAll('.support-logo-item'));
    const total = sourceItems.length;
    if (!total) return;

    sourceItems.forEach((item, index) => {
      item.dataset.logoIndex = String(index);
      item.classList.remove('is-active');
    });

    const startIndexRaw = parseInt(track.dataset.activeStart || '4', 10);
    const startIndex = Math.min(Math.max(Number.isFinite(startIndexRaw) ? startIndexRaw : 4, 0), total - 1);
    const isTouchDevice = window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches && !isTouchDevice;

    const copies = 5;
    const middleCopy = 2;
    const originals = sourceItems.map((item) => item.cloneNode(true));

    track.innerHTML = '';

    for (let copy = 0; copy < copies; copy += 1) {
      originals.forEach((item, logoIndex) => {
        const clone = item.cloneNode(true);
        clone.dataset.logoIndex = String(logoIndex);
        clone.dataset.copy = String(copy);
        clone.classList.remove('is-active');
        if (copy !== middleCopy) clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    }

    let items = Array.from(track.querySelectorAll('.support-logo-item'));
    let active = middleCopy * total + startIndex;
    let timer = null;
    let resizeTimer = null;

    function getLogoIndex(item) {
      const index = parseInt((item && item.dataset ? item.dataset.logoIndex : '0') || '0', 10);
      return Number.isFinite(index) ? index : 0;
    }

    function getActiveVisual(item) {
      return item ? (item.querySelector('img') || item) : null;
    }

    function getVisualCenter(item) {
      const visual = getActiveVisual(item);
      if (!item || !visual) return item ? item.offsetLeft + item.offsetWidth / 2 : 0;

      return item.offsetLeft + visual.offsetLeft + visual.offsetWidth / 2;
    }

    function updateCaption(item) {
      if (!caption || !item) return;
      const text = item.getAttribute('data-caption') || '';
      if (!text) return;

      if (caption.textContent !== text) {
        caption.classList.add('is-changing');
        window.setTimeout(() => {
          caption.textContent = text;
          caption.classList.remove('is-changing');
        }, 140);
      }
    }

    function setActiveClass() {
      items.forEach((item, index) => item.classList.toggle('is-active', index === active));
    }

    function centerActive(animate = true) {
      items = Array.from(track.querySelectorAll('.support-logo-item'));
      const item = items[active];
      if (!item) return;

      setActiveClass();

      if (!animate) {
        track.style.setProperty('transition', 'none', 'important');
      } else {
        track.style.removeProperty('transition');
      }

      window.requestAnimationFrame(() => {
        const railCenter = rail.clientWidth / 2;
        const visualCenter = getVisualCenter(item);
        const nextX = railCenter - visualCenter;

        track.style.transform = `translate3d(${nextX}px, 0, 0)`;
        updateCaption(item);

        if (!animate) {
          track.offsetHeight;
          window.requestAnimationFrame(() => {
            track.style.removeProperty('transition');
          });
        }
      });
    }

    function normalizeToMiddleCopy() {
      const currentItem = items[active];
      const logoIndex = getLogoIndex(currentItem);
      const minSafe = total;
      const maxSafe = total * (copies - 1);

      if (active >= maxSafe || active < minSafe) {
        active = middleCopy * total + logoIndex;
        centerActive(false);
      }
    }

    function next() {
      active += 1;
      centerActive(true);
    }

    function start() {
      stop();
      if (reduceMotion || total < 2) return;
      timer = window.setInterval(next, 3000);
    }

    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    track.addEventListener('transitionend', (event) => {
      if (event.propertyName !== 'transform') return;
      normalizeToMiddleCopy();
    });

    function bindClicks() {
      items.forEach((item, index) => {
        item.addEventListener('click', () => {
          active = index;
          centerActive(true);
          start();
        });
      });
    }

    function setup() {
      items = Array.from(track.querySelectorAll('.support-logo-item'));
      bindClicks();

      centerActive(false);

      window.setTimeout(() => centerActive(false), 120);
      window.setTimeout(() => centerActive(false), 360);

      window.setTimeout(() => {
        centerActive(false);
        start();
      }, 850);
    }

    const images = Array.from(track.querySelectorAll('img'));

    setup();

    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', () => centerActive(false), { once: true });
        img.addEventListener('error', () => centerActive(false), { once: true });
      }
    });

    window.setTimeout(() => centerActive(false), 80);
    window.setTimeout(() => centerActive(false), 220);
    window.setTimeout(() => centerActive(false), 520);

    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => centerActive(false), 120);
    });

    if (window.matchMedia('(hover: hover)').matches) {
      rail.addEventListener('mouseenter', stop);
      rail.addEventListener('mouseleave', start);
    }

    window.addEventListener('pageshow', () => {
      centerActive(false);
      start();
    });

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => centerActive(false), 120);
      });

      window.visualViewport.addEventListener('scroll', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => centerActive(false), 120);
      });
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else {
        centerActive(false);
        start();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupportLogoCarousel);
  } else {
    initSupportLogoCarousel();
  }
})();

(() => {
  'use strict';

  function initSupportProjectStackCards() {
    const section = document.getElementById('support-projects');
    const list = section ? section.querySelector('.support-project-list') : null;
    const cards = list ? Array.from(list.querySelectorAll('.support-project-card')) : [];

    if (!section || !list || cards.length < 2 || section.dataset.stackCardsReady === '1') return;

    section.dataset.stackCardsReady = '1';

    let raf = 0;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    function getStickyTop() {
      const isMobile = window.matchMedia('(max-width: 1000px)').matches;
      return isMobile ? 12 : clamp(window.innerHeight * 0.072, 58, 90);
    }

    function update() {
      raf = 0;

      const stickyTop = getStickyTop();
      const startOffset = Math.min(window.innerHeight * 0.34, 280);

      cards.forEach((card, index) => {
        const next = cards[index + 1];
        let progress = 0;

        if (next) {
          const nextTop = next.getBoundingClientRect().top;
          progress = clamp((stickyTop + startOffset - nextTop) / startOffset, 0, 1);
        }

        card.style.setProperty('--support-stack-scale', (1 - progress * 0.028).toFixed(4));
        card.style.setProperty('--support-stack-y', `${(-progress * 10).toFixed(2)}px`);
        card.style.setProperty('--support-stack-dim', (progress * 0.07).toFixed(4));
      });
    }

    function requestUpdate() {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('orientationchange', requestUpdate);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(requestUpdate).catch(function () {});
    }

    requestUpdate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupportProjectStackCards);
  } else {
    initSupportProjectStackCards();
  }
})();
