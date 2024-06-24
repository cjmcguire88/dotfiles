import { deflate } from './zlib.js';
import { TooBigMsgError } from './errors.js';

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


// https://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2
function nextPow2(_v) {
  let v = _v | 0;
  v -= 1;
  v |= v >> 1;
  v |= v >> 2;
  v |= v >> 4;
  v |= v >> 8;
  v |= v >> 16;
  v += 1;
  return v;
}

function encodeLength(length) {
  // We could also encode length = 32767 = (1 << 15) - 1,
  // but since the message overhead is 2 bytes, in that case
  // the final message would go to the 64KB bucket, which
  // we don't want, so enforcing length < (1 << 15) - 1.
  if (length >= (1 << 15) - 1) {
    throw new TooBigMsgError('Message is too big');
  }
  return (1 << 15) | length;
}

function encodeWithPadding(message) {
  const compressed = deflate(message);
  const paddedSize = Math.max(1 << 10, nextPow2(2 + compressed.length));
  const data = new Uint8Array(paddedSize);
  new DataView(data.buffer).setUint16(0, encodeLength(compressed.length));
  data.set(compressed, 2);
  return data;
}

export { encodeWithPadding };
