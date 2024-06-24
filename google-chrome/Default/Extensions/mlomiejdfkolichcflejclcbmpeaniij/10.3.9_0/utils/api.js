import { jwtDecode } from '../node_modules/jwt-decode/build/esm/index.js';
import { GHOSTERY_DOMAIN } from '../node_modules/@ghostery/libs/src/urls.js';

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


const AUTH_URL = `https://consumerapi.${GHOSTERY_DOMAIN}/api/v2`;
const ACCOUNT_URL = `https://accountapi.${GHOSTERY_DOMAIN}/api/v2.1.0`;

const COOKIE_DOMAIN = `.${GHOSTERY_DOMAIN}`;
const COOKIE_URL = `https://${GHOSTERY_DOMAIN}`;
const COOKIE_DURATION = 60 * 60 * 24 * 90; // 90 days in seconds
const COOKIE_SHORT_DURATION = 60 * 60; // 1 hour in seconds
let COOKIE_EXPIRATION_DATE_OFFSET = 0;

const HOME_PAGE_URL = `https://www.${GHOSTERY_DOMAIN}/`;
const SIGNON_PAGE_URL = `https://www.${GHOSTERY_DOMAIN}/signin`;
const CREATE_ACCOUNT_PAGE_URL = `https://www.${GHOSTERY_DOMAIN}/register`;
const ACCOUNT_PAGE_URL = `https://www.${GHOSTERY_DOMAIN}/account`;

const WTM_PAGE_URL = `https://www.${GHOSTERY_DOMAIN}/whotracksme/`;

async function isFirstPartyIsolation() {
  // Safari has a bug with cookies.getAll(),
  // which shows a permission popup to the user about random domains.
  // This feature is not yet supported in Safari we can safely return false.
  {
    if (isFirstPartyIsolation.value === undefined) {
      try {
        await chrome.cookies.getAll({ domain: '' });
        isFirstPartyIsolation.value = false;
      } catch (e) {
        isFirstPartyIsolation.value =
          e.message.indexOf('firstPartyDomain') > -1;
      }
    }

    return isFirstPartyIsolation.value;
  }
}

async function getCookie(name) {
  const cookie = await chrome.cookies.get({
    url: COOKIE_URL,
    name,
    ...((await isFirstPartyIsolation())
      ? { firstPartyDomain: GHOSTERY_DOMAIN }
      : {}),
  });

  if (
    cookie &&
    (cookie.session ||
      cookie.expirationDate * (1000 ) >
        Date.now())
  ) {
    return cookie;
  }

  return null;
}

async function setCookie(name, value, durationInSec = COOKIE_DURATION) {
  return chrome.cookies[value !== undefined ? 'set' : 'remove']({
    name,
    url: COOKIE_URL,
    ...(value !== undefined
      ? {
          path: '/',
          value,
          domain: COOKIE_DOMAIN,
          expirationDate:
            Date.now() / 1000 + durationInSec + COOKIE_EXPIRATION_DATE_OFFSET,
        }
      : {}),
    ...((await isFirstPartyIsolation())
      ? { firstPartyDomain: GHOSTERY_DOMAIN }
      : {}),
  });
}

/*
  WARNING: This function is meant bo be used only by the Session store model.
  It is not intended to be used by any other part of the extension.
  If you need to get user's session, use the `store.resolve(Session)` or similar...
*/
async function session() {
  const userId = await getCookie('user_id');
  if (!userId) return null;

  let accessToken = await getCookie('access_token');

  try {
    if (!accessToken) {
      const refreshToken = await getCookie('refresh_token');
      if (!refreshToken) return null;

      const res = await fetch(`${AUTH_URL}/refresh_token`, {
        method: 'post',
        headers: {
          UserId: userId.value,
          RefreshToken: refreshToken.value,
        },
        credentials: 'omit',
      });

      if (res.ok) {
        const data = await res.json();
        accessToken = { value: data.access_token };

        await Promise.all([
          setCookie('user_id', data.user_id),
          setCookie('refresh_token', data.refresh_token),
          setCookie('access_token', data.access_token, COOKIE_SHORT_DURATION),
          setCookie('csrf_token', data.csrf_token, COOKIE_SHORT_DURATION),
        ]);
      } else {
        throw Error(`${res.status} ${res.statusText}`);
      }
    }
  } catch (e) {
    console.error('Failed to refresh access token:', e);

    accessToken = undefined;

    await Promise.all([
      setCookie('user_id', undefined),
      setCookie('refresh_token', undefined),
      setCookie('access_token', undefined),
      setCookie('csrf_token', undefined),
    ]);
  }

  return accessToken ? jwtDecode(accessToken.value) : null;
}

async function getUserOptions() {
  const userId = await getCookie('user_id');
  const accessToken = await getCookie('access_token');
  const csrfToken = await getCookie('csrf_token');

  const res = await fetch(`${ACCOUNT_URL}/options/${userId.value}`, {
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${accessToken.value}`,
      'X-CSRF-Token': csrfToken.value,
    },
    credentials: 'omit',
  });

  if (!res.ok) {
    throw Error(`Failed to get options: ${res.status} ${res.statusText}`);
  }

  return (await res.json()).data.attributes.options || {};
}

async function setUserOptions(options) {
  const userId = await getCookie('user_id');
  const accessToken = await getCookie('access_token');
  const csrfToken = await getCookie('csrf_token');

  const res = await fetch(`${ACCOUNT_URL}/options/${userId.value}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${accessToken.value}`,
      'X-CSRF-Token': csrfToken.value,
    },
    credentials: 'omit',
    body: JSON.stringify({
      data: {
        type: 'options',
        id: userId.value,
        attributes: { options },
      },
    }),
  });

  if (!res.ok) {
    throw Error(`Failed to save options: ${res.status} ${res.statusText}`);
  }

  return (await res.json()).data.attributes.options || {};
}

export { ACCOUNT_PAGE_URL, COOKIE_DOMAIN, CREATE_ACCOUNT_PAGE_URL, HOME_PAGE_URL, SIGNON_PAGE_URL, WTM_PAGE_URL, getUserOptions, session, setCookie, setUserOptions };
