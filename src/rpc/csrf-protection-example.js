/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default () => (ctx, next) => {
  if (ctx.path === ctx.prefix + '/test-fetch' && ctx.method === 'POST') {
    ctx.body = 'hello world';
  }
  return next();
};
