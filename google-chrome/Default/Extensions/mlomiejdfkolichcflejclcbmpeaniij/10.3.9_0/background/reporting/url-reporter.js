import Reporting from '../../node_modules/@whotracksme/webextension-packages/packages/reporting/src/reporting.js';
import '../../node_modules/@whotracksme/webextension-packages/packages/reporting/src/webrequest-pipeline/logger.js';
import '../../node_modules/@whotracksme/webextension-packages/packages/reporting/src/utils/pacemaker.js';
import '../../node_modules/@whotracksme/webextension-packages/packages/reporting/src/md5.js';
import '../../node_modules/@whotracksme/webextension-packages/packages/reporting/src/logger.js';
import '../../node_modules/@whotracksme/webextension-packages/packages/reporting/src/request/hash.js';
import '../../node_modules/idb/build/index.js';
import '../../node_modules/@whotracksme/webextension-packages/packages/reporting/src/webrequest-pipeline/utils/webrequest.js';
import '../../node_modules/@whotracksme/webextension-packages/packages/reporting/src/webrequest-pipeline/cname-uncloak.js';
import getBrowserInfo from '../../node_modules/@ghostery/libs/src/browser-info.js';
import config from './config.js';
import communication from './communication.js';
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


const urlReporter = new Reporting({
  config: config.url,
  storage: new StorageLocal('reporting'),
  connectDatabase: prefixedIndexedDBKeyValueStore('reporting'),
  communication,
  browserInfoProvider: getBrowserInfo.getRawBrowserInfo,
});

export { urlReporter as default };
