/* globals fetch */

import tape from 'tape';

/*
See https://github.com/zloirock/core-js#commonjs
*/

tape('ES5', t => {
  t.doesNotThrow(() => {
    Object.create({a: 2});
  }, 'Object.create');
  t.doesNotThrow(() => {
    Object.keys({a: 2});
  }, 'Object.keys');
  t.doesNotThrow(() => {
    Array.isArray([]);
  }, 'Array.isArray');
  t.end();
});

tape('ES6', t => {
  t.doesNotThrow(() => {
    Object.assign({a: 2}, {b: 3});
  }, 'Object.assign');
  t.doesNotThrow(() => {
    new Promise(res => res()).then(() => {});
  }, 'Promise');
  t.doesNotThrow(() => {
    [1, 2, 3].find(e => e === 2);
  }, 'Array#find');
  t.end();
});

tape('W3C', t => {
  t.ok(typeof fetch === 'function', 'fetch');
  t.end();
});
