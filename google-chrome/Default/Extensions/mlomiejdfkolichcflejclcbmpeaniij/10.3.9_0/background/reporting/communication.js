import AnonymousCommunication from '../../node_modules/@whotracksme/webextension-packages/packages/anonymous-communication/src/index.js';
import config from './config.js';
import prefixedIndexedDBKeyValueStore from './storage-indexeddb.js';
import StorageLocal from './storage-chrome-local.js';

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


const communication = new AnonymousCommunication({
  config: config.url,
  storage: new StorageLocal('communication'),
  connectDatabase: prefixedIndexedDBKeyValueStore('communication'),
});

export { communication as default };
