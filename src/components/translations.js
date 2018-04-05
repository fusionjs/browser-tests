/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {Translate, withTranslations} from 'fusion-plugin-i18n-react';

export default withTranslations(['raw', 'interpolated'])(({translate}) => {
  return (
    <div>
      <h1 id="i18n">
        <Translate id="test" data={{ending: '!'}} />
      </h1>
      <h2 id="i18n-hoc">{translate('raw')}</h2>
      <h2 id="i18n-hoc-interpolation">
        {translate('interpolated', {thing: 'doge'})}
      </h2>
      <p>
        To test translations in Chrome, go to{' '}
        <code>Settings &gt; Languages</code>, add{' '}
        <code>Portuguese (Brazil)</code> to the top of the list, then refresh
        the page
      </p>
    </div>
  );
});
