/* globals fetch */

import tape from 'tape';

tape('Simple test', t => {
  t.deepEqual(Object.assign({a: 2}, {b: 5}), {a: 2, b: 5});
  t.ok(typeof fetch === 'function');

  t.end();
});
