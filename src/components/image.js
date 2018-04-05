/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {assetUrl} from 'fusion-core';

export default function Image() {
  return (
    <div>
      <p>
        Example of using <code>assetUrl</code> to load an image
      </p>
      <img id="img" src={assetUrl('../../static/test.png')} />
    </div>
  );
}
