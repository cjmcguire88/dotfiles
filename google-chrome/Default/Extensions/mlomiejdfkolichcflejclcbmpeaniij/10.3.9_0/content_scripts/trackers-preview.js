(function () {
  'use strict';

  /**
   * Ghostery Browser Extension
   * https://www.ghostery.com/
   *
   * Copyright 2017-present Ghostery GmbH. All rights reserved.
   *
   * This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0
   */

  const colors = {
    advertising: '#CB55CD',
    site_analytics: '#5EBEDB',
    consent: '#556FCD',
    essential: '#FC9734',
    hosting: '#8459A5',
    customer_interaction: '#EF671E',
    unidentified: '#79859E',
    audio_video_player: '#4ECB4E',
    cdn: '#4ECBA1',
    comments: '#4EA1CB',
    email: '#4E4ECB',
    extensions: '#A14ECB',
    misc: '#CB4EA1',
    pornvertising: '#CB4E4E',
    social_media: '#CBA14E',
    telemetry: '#A1CB4E',
    other: '#D5DBE5',
  };

  const backgroundColors = {
    ...colors,
    site_analytics: '#87D7EF',
    unidentified: '#DBDFE7',
  };

  const order = [
    'advertising',
    'site_analytics',
    'consent',
    'essential',
    'hosting',
    'customer_interaction',
    'audio_video_player',
    'cdn',
    'comments',
    'email',
    'extensions',
    'misc',
    'pornvertising',
    'social_media',
    'telemetry',
    'unidentified',
    'other',
  ];

  function getCategoryKey(category) {
    return colors[category] ? category : 'unidentified';
  }

  function getCategoryBgColor(category) {
    return backgroundColors[getCategoryKey(category)];
  }

  /**
   * Ghostery Browser Extension
   * https://www.ghostery.com/
   *
   * Copyright 2017-present Ghostery GmbH. All rights reserved.
   *
   * This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0
   */


  function degToRad(degree) {
    const factor = Math.PI / 180;
    return degree * factor;
  }

  function grayscaleColor(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const value = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return `rgb(${value}, ${value}, ${value})`;
  }

  function drawWheel(
    ctx,
    size,
    categories,
    { useScale = true, grayscale = false } = {},
  ) {
    if (useScale && typeof window !== 'undefined') {
      const { canvas } = ctx;

      canvas.style.width = size + 'px';
      canvas.style.height = size + 'px';

      // Set actual size in memory (scaled to account for extra pixel density).
      const scale = window.devicePixelRatio;
      canvas.width = Math.floor(size * scale);
      canvas.height = Math.floor(size * scale);

      // Normalize coordinate system to use css pixels.
      ctx.scale(scale, scale);
    }

    // Group trackers by sorted category
    // (JavaScript objects will preserve the order)
    const groupedCategories = {};
    order.forEach((c) => (groupedCategories[getCategoryKey(c)] = 0));
    categories.forEach((c) => (groupedCategories[getCategoryKey(c)] += 1));

    const center = size / 2;
    const increment = 360 / categories.length;

    /* Background START */
    // This special blue background is required for Desktop Safari to render the colors property
    // We've tried: white, black, red and transparent - non of those works
    // Line width has to be a little bit smaller than the final arc so it blue wont be visible on dithered edges.
    // Line width cannot be too small as otherwise Safari will render the colors incorrectly.
    // Number below were chosen by trial end error.
    ctx.lineWidth = Math.floor(size * 0.14) * 0.95;
    const radius = size / 2 - ctx.lineWidth;
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.arc(center, center, Math.floor(radius), 0, 2 * Math.PI);
    ctx.stroke();
    /* Background END */

    ctx.lineWidth = size * 0.14;
    let position = -90;
    for (const [category, numTrackers] of Object.entries(groupedCategories)) {
      if (numTrackers > 0) {
        const newPosition = position + numTrackers * increment;
        const color = getCategoryBgColor(category);
        ctx.strokeStyle = grayscale ? grayscaleColor(color) : color;
        ctx.beginPath();
        ctx.arc(
          center,
          center,
          radius,
          degToRad(position),
          Math.min(degToRad(newPosition + 1), 2 * Math.PI),
        );
        ctx.stroke();
        position = newPosition;
      }
    }
  }

  /**
   * WhoTracks.Me
   * https://whotracks.me/
   *
   * Copyright 2017-present Ghostery GmbH. All rights reserved.
   *
   * This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0
   */

  const WRAPPER_CLASS = 'wtm-popup-iframe-wrapper';

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  function closePopups() {
    [...document.querySelectorAll(`.${WRAPPER_CLASS}`)].forEach((popup) => {
      popup.parentElement.removeChild(popup);
    });
  }

  function resizePopup(height) {
    [...document.querySelectorAll(`.${WRAPPER_CLASS}`)].forEach((popup) => {
      popup.style.height = `${height}px`;
    });
  }

  const getTop = (el) =>
    el.offsetTop + (el.offsetParent && getTop(el.offsetParent));

  function renderPopup(container, stats, popupUrl) {
    closePopups();

    const wrapper = document.createElement('div');
    wrapper.classList.add(WRAPPER_CLASS);
    if (isMobile) {
      wrapper.style.width = window.innerWidth - 20 + 'px';
      wrapper.style.left = '10px';
    } else {
      const left = container.getBoundingClientRect().left - 350 / 2 + 12;
      wrapper.style.left = (left < 20 ? 20 : left) + 'px';
    }
    wrapper.style.top = getTop(container) + 25 + 'px';

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `${popupUrl}?domain=${stats.domain}`);

    wrapper.appendChild(iframe);
    document.body.appendChild(wrapper);
  }

  function getWheelElement(stats, popupUrl) {
    const count = stats.stats.length;

    if (count === 0) {
      return null;
    }

    const container = document.createElement('div');
    container.classList.add('wtm-tracker-wheel-container');

    const label = document.createElement('label');
    label.innerText = count;

    const canvas = document.createElement('canvas');
    canvas.classList.add('wtm-tracker-wheel');

    const ctx = canvas.getContext('2d');
    drawWheel(ctx, 16, stats.stats);

    container.appendChild(canvas);
    container.appendChild(label);

    container.addEventListener('click', (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();

      renderPopup(container, stats, popupUrl);
    });

    return container;
  }

  function setupTrackersPreview(popupUrl) {
    const elements = [
      ...window.document.querySelectorAll(
        '[data-hveid] div.yuRUbf > div > span > a, [data-hveid] div.yuRUbf > div > a, [data-hveid] div.xpd a.cz3goc, [data-hveid] > .xpd > div.kCrYT:first-child > a',
      ),
    ].filter((el) => !el.dataset.wtm);

    if (elements.length) {
      const links = elements.map((el) => {
        if (el.hostname === window.location.hostname) {
          const url = new URL(el.href);
          return url.searchParams.get('url') || url.searchParams.get('q');
        }
        return el.href;
      });

      chrome.runtime.sendMessage(
        { action: 'getWTMReport', links },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(
              'Could not retrieve WTM information on URLs',
              chrome.runtime.lastError,
            );
            return;
          }

          elements.forEach((anchor, i) => {
            const stats = response.wtmStats[i];
            if (stats) {
              try {
                const wheelEl = getWheelElement(stats, popupUrl);
                if (!wheelEl) return;

                const container =
                  // Desktop
                  anchor.parentElement.querySelector('.B6fmyf') ||
                  anchor.parentElement.parentElement.querySelector('.B6fmyf') ||
                  // Mobile
                  anchor.querySelector('span.yIn8Od') ||
                  anchor.querySelector('div[role="link"]') ||
                  anchor.querySelector('div.UPmit.AP7Wnd');

                if (!container) return;

                let tempEl = container.firstElementChild;
                if (tempEl && tempEl.textContent.includes(stats.domain)) {
                  container.insertBefore(wheelEl, tempEl.nextElementSibling);
                } else {
                  container.appendChild(wheelEl);
                }

                anchor.dataset.wtm = 1;
              } catch (e) {
                console.warn(
                  'Unexpected error while rendering the Tracker Preview wheel',
                  e,
                );
              }
            }
          });
        },
      );

      const observer = new MutationObserver((mutations) => {
        if (mutations.some((m) => m.addedNodes.length)) {
          observer.disconnect();
          setTimeout(() => setupTrackersPreview(popupUrl), 500);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }

  window.addEventListener('message', (message) => {
    if (
      message.origin + '/' !== chrome.runtime.getURL('/').toLowerCase() &&
      typeof message.data == 'string'
    ) {
      return;
    }

    if (message.data === 'WTMReportClosePopups') {
      closePopups();
    } else if (message.data === 'WTMReportDisable') {
      closePopups();

      // Remove the wheel from the elements
      [...document.querySelectorAll('[data-wtm]')].forEach((el) => {
        delete el.dataset.wtm;
      });

      [...document.querySelectorAll('.wtm-tracker-wheel-container')].forEach(
        (el) => {
          el.parentElement.removeChild(el);
        },
      );

      chrome.runtime.sendMessage({ action: 'disableWTMReport' });
    } else if (message.data?.startsWith('WTMReportResize')) {
      const height = message.data.split(':')[1];
      resizePopup(height);
    }
  });

  /**
   * Ghostery Browser Extension
   * https://www.ghostery.com/
   *
   * Copyright 2017-present Ghostery GmbH. All rights reserved.
   *
   * This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0
   */


  document.addEventListener('DOMContentLoaded', () => {
    setupTrackersPreview(
      chrome.runtime.getURL('pages/trackers-preview/index.html'),
    );
  });

})();
