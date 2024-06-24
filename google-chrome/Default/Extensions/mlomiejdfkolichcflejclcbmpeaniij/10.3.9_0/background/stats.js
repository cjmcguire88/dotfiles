import { getOffscreenImageData } from '../node_modules/@ghostery/ui/src/utils/wheel.js';
import { order } from '../node_modules/@ghostery/ui/src/utils/categories.js';
import DailyStats from '../store/daily-stats.js';
import Options, { observe, isGlobalPaused } from '../store/options.js';
import '../node_modules/jwt-decode/build/esm/index.js';
import AutoSyncingMap from '../utils/map.js';
import ExtendedRequest from './utils/request.js';
import store from '../node_modules/hybrids/src/store.js';

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


const tabStats = new AutoSyncingMap({ storageKey: 'tabStats:v1' });

const chromeAction = chrome.action || chrome.browserAction;

const { icons } = chrome.runtime.getManifest();
const inactiveIcons = Object.keys(icons).reduce((acc, key) => {
  acc[key] = icons[key].replace('.', '-inactive.');
  return acc;
}, {});

function setBadgeColor(color = '#3f4146' /* gray-600 */) {
  chromeAction.setBadgeBackgroundColor({ color });
}

observe('terms', async (terms) => {
  if (!terms) {
    await chromeAction.setBadgeText({ text: '!' });
    setBadgeColor('#f13436' /* danger-500 */);
  } else {
    await chromeAction.setBadgeText({ text: '' });
    setBadgeColor();
  }
});

async function refreshIcon(tabId) {
  const options = await store.resolve(Options);

  const stats = tabStats.get(tabId);
  if (!stats) return;

  const inactive =
    isGlobalPaused(options) ||
    !options.terms ||
    options.paused.some(({ id }) => id === stats.hostname);

  const data = {};
  if (options.trackerWheel && stats.trackers.length > 0) {
    data.imageData = getOffscreenImageData(
      128,
      stats.trackers.map((t) => t.category),
      { grayscale: inactive },
    );
  } else {
    data.path = inactive ? inactiveIcons : icons;
  }

  // Note: Even in MV3, this is not (yet) returning a promise.
  chromeAction.setIcon({ tabId, ...data }, () => {
    if (chrome.runtime.lastError) {
      console.debug(
        'setIcon failed for tabId',
        tabId,
        '(most likely the tab was closed)',
        chrome.runtime.lastError,
      );
    }
  });

  if (Options.trackerCount) {
    try {
      await chromeAction.setBadgeText({
        tabId,
        text: options.trackerCount ? String(stats.trackers.length) : '',
      });
    } catch (e) {
      console.debug('Error while trying update the badge', e);
    }
  }
}

const delayMap = new Map();
function updateIcon(tabId, force) {
  if (delayMap.has(tabId)) {
    if (!force) return;
    clearTimeout(delayMap.get(tabId));
  }

  delayMap.set(
    tabId,
    setTimeout(
      () => {
        delayMap.delete(tabId);
        refreshIcon(tabId);
      },
      // Firefox flickers when updating the icon, so we should expand the debounce delay
      250,
    ),
  );

  refreshIcon(tabId);
}

function pushTabStats(stats, requests) {
  let trackersUpdated = false;

  for (const request of requests) {
    const pattern = request.metadata;

    if (pattern) {
      let tracker = stats.trackers.find((t) => t.id === pattern.id);

      if (!tracker) {
        tracker = { ...pattern, requests: [] };
        stats.trackers.push(tracker);
        trackersUpdated = true;
      }

      if (!tracker.requests.some((r) => r.url === request.url)) {
        tracker.requestsCount = (tracker.requestsCount || 0) + 1;
        tracker.blocked = tracker.blocked || request.blocked;
        tracker.modified = tracker.modified || request.modified;
        tracker.requests = tracker.requests.slice(0, 9);

        tracker.requests.unshift({
          id: request.requestId,
          url: request.url,
          blocked: request.blocked,
          modified: request.modified,
        });
      }
    }
  }

  return trackersUpdated;
}

async function updateTabStats(tabId, requests) {
  const stats = tabStats.get(tabId);

  // Stats might not be available on Firefox using webRequest.onBeforeRequest
  // as some of the requests are fired before the tab is created, tabId -1
  if (!stats) return;

  // Filter out requests that are not related to the current page
  // (e.g. requests on trailing edge when navigation to a new page is in progress)
  requests = requests.filter(
    // As a fallback, we assume that the request is from the origin URL
    (request) =>
      !request.sourceHostname ||
      request.sourceHostname.endsWith(stats.hostname),
  );

  let trackersUpdated = pushTabStats(stats, requests);

  // After navigation stats are cleared, so the current `stats` variable might be outdated
  if (stats === tabStats.get(tabId)) {
    tabStats.set(tabId, stats);

    if (trackersUpdated) {
      // We need to update the icon only if new categories were added
      updateIcon(tabId);

      stats.trackers.sort(
        (a, b) => order.indexOf(a.category) - order.indexOf(b.category),
      );
    }
  }
}

async function flushTabStatsToDailyStats(tabId) {
  const stats = tabStats.get(tabId);
  if (!stats || !stats.trackers.length) return;

  let trackersBlocked = 0;
  let trackersModified = 0;

  for (const tracker of stats.trackers) {
    trackersBlocked += tracker.blocked ? 1 : 0;
    trackersModified += tracker.modified ? 1 : 0;
  }

  const dailyStats = await store.resolve(
    DailyStats,
    new Date().toISOString().split('T')[0],
  );

  await store.set(dailyStats, {
    trackersBlocked: dailyStats.trackersBlocked + trackersBlocked,
    trackersModified: dailyStats.trackersModified + trackersModified,
    pages: dailyStats.pages + 1,
    patterns: [
      ...new Set([...dailyStats.patterns, ...stats.trackers.map((t) => t.id)]),
    ],
  });
}

function setupTabStats(details) {
  flushTabStatsToDailyStats(details.tabId);

  const request = ExtendedRequest.fromRequestDetails(details);

  if (request.isHttp || request.isHttps) {
    tabStats.set(details.tabId, {
      hostname: request.hostname.replace('www.', ''),
      url: request.url,
      trackers: [],
      timestamp: details.timeStamp,
    });
  } else {
    tabStats.delete(details.tabId);
  }

  updateIcon(details.tabId, true);
}

// Setup stats for the tab when a user navigates to a new page
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.tabId > -1 && details.parentFrameId === -1) {
    setupTabStats(details);
  }
});

{
  // Chromium based browser can use readonly webRequest API
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      if (details.tabId < 0) return;

      const request = ExtendedRequest.fromRequestDetails(details);
      if (details.type !== 'main_frame') {
        updateTabStats(details.tabId, [request]);
      }
    },
    {
      urls: ['<all_urls>'],
    },
  );

  // Callback for listing if requests were blocked by the DNR
  chrome.webRequest.onErrorOccurred.addListener(
    (details) => {
      if (details.error === 'net::ERR_BLOCKED_BY_CLIENT') {
        const stats = tabStats.get(details.tabId);
        if (!stats) return;

        for (const tracker of stats.trackers) {
          for (const request of tracker.requests) {
            if (request.id === details.requestId) {
              request.blocked = true;
              tracker.blocked = true;

              return;
            }
          }
        }

        const request = ExtendedRequest.fromRequestDetails(details);
        request.blocked = true;

        updateTabStats(details.tabId, [request]);
      }
    },
    {
      urls: ['<all_urls>'],
    },
  );
}

chrome.tabs.onRemoved.addListener((tabId) => {
  flushTabStatsToDailyStats(tabId);
  tabStats.delete(tabId);
});

export { tabStats, updateTabStats };
