/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {split} from 'fusion-react-async';

const LoadingComponent = () => <div>Loading...</div>;
const ErrorComponent = () => <div>Error loading bundle split component</div>;
const SplitExample = split({
  defer: true,
  load: () => import('./split-deferred.js'),
  LoadingComponent,
  ErrorComponent,
});

export default function bundleSplitComponent() {
  return (
    <div>
      <SplitExample />
      <div id="split-example">split-example</div>
    </div>
  );
}
