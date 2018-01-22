/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* globals window */

import React from 'react';

// For reasons unknown. Nightmare overrides polyfills in execute functions.
// So we need to insert polyfill results in the DOM
export default class PolyfillsTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: null,
      objectAssign: null,
      arrayInclude: null,
      arrayFind: null,
      promise: null,
      weakMap: null,
      map: null,
      set: null,
    };
  }

  componentDidMount() {
    // Symbol
    const symbol = __BROWSER__
      ? window.Symbol && typeof window.Symbol() === 'symbol'
      : true;

    // Object.assign
    const assignment =
      typeof Object.assign === 'function' &&
      Object.assign({a: 1, b: 3}, {b: 2, c: 3});
    const objectAssign =
      assignment &&
      assignment.a === 1 &&
      assignment.b === 2 &&
      assignment.c === 3;

    // Array#include
    const arrayShouldInclude = [].includes && [1, 2, 3].includes(2);
    const arrayShouldNotInclude = [].includes && [1, 2, 3].includes(4);
    const arrayInclude = arrayShouldInclude && !arrayShouldNotInclude;

    // Array#find
    const found =
      [].find &&
      [{a: 1, b: 2}, {a: 2, b: 1}, {a: 3}].find(function(e) {
        return e.a === 2;
      });
    const arrayFind = found && found.a === 2 && found.b === 1;

    // Map
    let map = typeof Map === 'function' && new Map();
    const key = {};
    const value = {};
    if (map) {
      map.set(key, value);
    }
    map = map && map.get(key) === value;

    // Weak Map
    let weakMap = typeof WeakMap === 'function' && new WeakMap();
    const weakKey = {};
    const weakValue = {};
    if (weakMap) {
      weakMap.set(weakKey, weakValue);
    }
    weakMap = weakMap && weakMap.get(weakKey) === weakValue;

    // Set
    let set = typeof Set === 'function' && new Set([1, 2, 3, 1, 2]);
    set = set && set.size === 3;

    // Promise
    if (typeof Promise === 'function') {
      new Promise(function(resolve) {
        resolve(3);
      }).then(d => {
        this.setState({promise: d === 3});
      });
    } else {
      this.setState({promise: false});
    }

    this.setState({
      symbol,
      objectAssign,
      arrayInclude,
      arrayFind,
      map,
      weakMap,
      set,
    });
  }

  render() {
    return (
      <div id="polyfills-root">
        {this.state.symbol !== null ? (
          <div id="symbol">{`symbol: ${this.state.symbol}`}</div>
        ) : null}
        {this.state.objectAssign !== null ? (
          <div id="assign">{`assign: ${this.state.objectAssign}`}</div>
        ) : null}
        {this.state.arrayInclude !== null ? (
          <div id="arrayinclude">{`array.include: ${
            this.state.arrayInclude
          }`}</div>
        ) : null}
        {this.state.arrayFind !== null ? (
          <div id="arrayfind">{`array.find: ${this.state.arrayFind}`}</div>
        ) : null}
        {this.state.map !== null ? (
          <div id="map">{`map: ${this.state.map}`}</div>
        ) : null}
        {this.state.weakMap !== null ? (
          <div id="weakMap">{`weakMap: ${this.state.weakMap}`}</div>
        ) : null}
        {this.state.set !== null ? (
          <div id="set">{`set: ${this.state.set}`}</div>
        ) : null}
        {this.state.promise !== null ? (
          <div id="promise">{`promise: ${this.state.promise}`}</div>
        ) : null}
      </div>
    );
  }
}
