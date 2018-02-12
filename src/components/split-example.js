/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow
import React from 'react';

export default function bundleSplitComponent() {
  return <div id="split-example">This should be async loaded</div>;
}
