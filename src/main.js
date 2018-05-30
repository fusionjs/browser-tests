/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import App from 'fusion-react';
import JWTSession, {
  SessionCookieNameToken,
  SessionSecretToken,
} from 'fusion-plugin-jwt';
import CsrfProtection, {
  FetchForCsrfToken,
} from 'fusion-plugin-csrf-protection-react';
import Router from 'fusion-plugin-react-router';
import I18n, {I18nToken, I18nLoaderToken} from 'fusion-plugin-i18n-react';
import UniversalEvents, {
  UniversalEventsToken,
} from 'fusion-plugin-universal-events-react';
import UniversalLogger from 'fusion-plugin-universal-logger';
import Styletron from 'fusion-plugin-styletron-react';
import FontLoaderReactPlugin, {
  FontLoaderReactConfigToken,
} from 'fusion-plugin-font-loader-react';
import RPC, {RPCToken, RPCHandlersToken} from 'fusion-plugin-rpc-redux-react';
import Redux, {
  ReduxToken,
  ReducerToken,
  EnhancerToken,
  GetInitialStateToken,
} from 'fusion-plugin-react-redux';
import ErrorHandling, {ErrorHandlerToken} from 'fusion-plugin-error-handling';
import NodePerformanceEmitterPlugin, {
  NodePerformanceEmitterToken,
  EventLoopLagIntervalToken,
  MemoryIntervalToken,
  SocketIntervalToken,
} from 'fusion-plugin-node-performance-emitter';
import BrowserPerformanceEmitter from 'fusion-plugin-browser-performance-emitter';
import ReduxActionEmitterEnhancer from 'fusion-plugin-redux-action-emitter-enhancer';
import unfetch from 'unfetch';
import {LoggerToken, FetchToken, SessionToken} from 'fusion-tokens';

import root from './components/root';
import rpcExample from './rpc/rpc-example';
import CsrfProtectionExample from './rpc/csrf-protection-example';
import reducer from './reducers/root';

import {preloadDepth, fonts} from './font-config.js';

import FaviconPlugin from './plugins/favicon.js';

import translations from '../translations/en-US.json';

export default function start() {
  const app = new App(root);

  if (__NODE__) {
    app.register(FaviconPlugin);
    const MemoryTranslationsLoader = {
      from: () => ({
        locale: 'en-US',
        translations,
      }),
    };
    app.register(I18nLoaderToken, MemoryTranslationsLoader);
    app.register(SessionToken, JWTSession);
    app.register(SessionSecretToken, 'abcdefg');
    app.register(SessionCookieNameToken, 'temp');
    app.register(RPCHandlersToken, rpcExample());
    app.register(RPCToken, RPC);
  } else if (__BROWSER__) {
    app.register(FetchForCsrfToken, unfetch);
    app.register(RPCToken, RPC);
  }
  app.register(FetchToken, CsrfProtection);
  app.register(UniversalEventsToken, UniversalEvents);
  app.register(Router);
  app.register(Styletron);

  app.register(FontLoaderReactConfigToken, {preloadDepth, fonts});
  app.register(FontLoaderReactPlugin);
  app.register(I18nToken, I18n);

  app.register(ReduxToken, Redux);
  app.register(ReducerToken, reducer);
  app.register(EnhancerToken, ReduxActionEmitterEnhancer);

  if (__NODE__) {
    app.register(
      GetInitialStateToken,
      async (): Object => {
        return {};
      }
    );
    app.register(NodePerformanceEmitterToken, NodePerformanceEmitterPlugin);
    app.register(EventLoopLagIntervalToken, 1000 * 10);
    app.register(MemoryIntervalToken, 1000 * 10);
    app.register(SocketIntervalToken, 1000 * 10);
    // eslint-disable-next-line no-console
    app.register(ErrorHandlerToken, e => console.log('error!', e));
  }
  app.register(ErrorHandling);
  app.register(BrowserPerformanceEmitter);
  app.register(LoggerToken, UniversalLogger);
  __NODE__ && app.register(CsrfProtectionExample);

  return app;
}
