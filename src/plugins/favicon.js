/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/*
NOTE: A better solution for DOM template changes will be coming in a future release and
this plugin will be completely removed in favor of a better interface
*/
import {assetUrl, dangerouslySetHTML, createPlugin} from 'fusion-core';
import type {Context} from 'fusion-core';

export default createPlugin<empty, void>({
  middleware: () => {
    const iconUrl = assetUrl('../static/favicon.ico');
    const escaped = dangerouslySetHTML(
      `<link rel="shortcut icon" type="image/x-icon" href="${iconUrl}"><link rel="icon" type="image/x-icon" href="${iconUrl}">`
    );
    return (ctx: Context, next) => {
      if (ctx.element) {
        ctx.template.head.push(escaped);
      }
      return next();
    };
  },
});
