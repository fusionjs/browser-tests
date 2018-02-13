// @flow

/*
NOTE: A better solution for DOM template changes will be coming in a future release and
this plugin will be completely removed in favor of a better interface
*/
import {assetUrl, dangerouslySetHTML, createPlugin} from 'fusion-core';
import type {Context} from 'fusion-core';

export default __NODE__ &&
  createPlugin({
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
