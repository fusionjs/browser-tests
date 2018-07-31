/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import {Route, Link, Switch, NotFound} from 'fusion-plugin-react-router';
import {split} from 'fusion-react';
import Image from './image';
import PolyfillTests from './polyfill-tests';
import RPCReduxExample from './rpc-redux-example';
import CsrfProtectionExample from './csrf-protection-example';
import ReduxExample from './redux-example';

const Home = () => <div>Hello</div>;
const PageNotFound = () => (
  <NotFound>
    <div>404</div>
  </NotFound>
);
const LoadingComponent = () => <div>Loading...</div>;
const ErrorComponent = () => <div>Error loading bundle split component</div>;
const SplitTranslations = split({
  load: () => import('./translations'),
  LoadingComponent,
  ErrorComponent,
});
const SplitExample = split({
  load: () => import('./split-example'),
  LoadingComponent,
  ErrorComponent,
});
const SplitStyled = split({
  defer: true,
  load: () => import('./styletron'),
  LoadingComponent,
  ErrorComponent,
});
const CustomFonts = split({
  load: () => import('./custom-fonts'),
  LoadingComponent,
  ErrorComponent,
});

const Root = (
  <div>
    <h1>Hello</h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li id="polyfills">
        <Link to="/test-polyfills">Test Polyfills</Link>
      </li>
      <li id="image">
        <Link to="/image">Image</Link>
      </li>
      <li id="split">
        <Link to="/split">Split</Link>
      </li>
      <li>
        <Link to="/split-deferred">Split (Deferred)</Link>
      </li>
      <li>
        <Link to="/styletron">CSS styled (Styletron)</Link>
      </li>
      <li id="custom-fonts">
        <Link to="/custom-fonts">Custom Fonts</Link>
      </li>
      <li id="translations">
        <Link to="/translations">Translations</Link>
      </li>
      <li>
        <Link to="/csrf-token">Fetching with CSRF token</Link>
      </li>
      <li>
        <Link to="/redux">Redux</Link>
      </li>
      <li>
        <Link to="/redux-rpc">Redux RPC</Link>
      </li>
      <li>
        <Link to="/404">404</Link>
      </li>
    </ul>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/test-polyfills" component={PolyfillTests} />
      <Route exact path="/image" component={Image} />
      <Route exact path="/split" component={SplitExample} />
      <Route exact path="/styletron" component={SplitStyled} />
      <Route exact path="/custom-fonts" component={CustomFonts} />
      <Route exact path="/translations" component={SplitTranslations} />
      <Route exact path="/csrf-token" component={CsrfProtectionExample} />
      <Route exact path="/redux" component={ReduxExample} />
      <Route exact path="/redux-rpc" component={RPCReduxExample} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default Root;
