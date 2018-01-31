/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
import I18n, {
  I18nToken,
  I18nLoaderToken,
  createI18nLoader,
} from 'fusion-plugin-i18n-react';
import UniversalEvents, {
  UniversalEventsToken,
} from 'fusion-plugin-universal-events-react';
import {
  /* UniversalLogger,*/ UniversalLoggerConfigToken,
} from 'fusion-plugin-universal-logger';
import Styletron from 'fusion-plugin-styletron-react';
import FontLoaderReactPlugin, {
  FontLoaderReactConfigToken,
} from 'fusion-plugin-font-loader-react';
import RPC, {RPCToken, RPCHandlersToken} from 'fusion-plugin-rpc-redux-react';
import Redux, {
  ReduxToken,
  ReducerToken,
  EnhancerToken,
  InitialStateToken,
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
// import unfetch from 'unfetch';
import {/* LoggerToken ,*/ FetchToken, SessionToken} from 'fusion-tokens';

import loggerConfig from './config/logger';

import root from './components/root';
import rpcExample from './rpc/rpc-example';
// import CsrfProtectionExample from './rpc/csrf-protection-example';
import reducer from './reducers/root';

import {preloadDepth, fonts} from './font-config.js';

// const MemoryTranslationsLoader = () => {
//   return {
//     from: () => {
//       if (__NODE__) {
//         return {
//           locale: 'en-US',
//           translations: require('../translations/en-US.json'),
//         };
//       }
//     },
//   };
// };

export default function start() {
  const app = new App(root);

  if (__NODE__) {
    app.register(SessionToken, JWTSession);
    app.register(SessionSecretToken, 'abcdefg');
    app.register(SessionCookieNameToken, 'temp');
    app.register(I18nLoaderToken, createI18nLoader());
  }

  // app.register(FetchForCsrfToken, unfetch);
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
  app.register(RPCToken, RPC);
  app.register(RPCHandlersToken, rpcExample());

  __NODE__ &&
    app.register(InitialStateToken, async () => {
      return {};
    });

  if (__NODE__) {
    app.register(NodePerformanceEmitterToken, NodePerformanceEmitterPlugin);
    app.register(EventLoopLagIntervalToken, 1000 * 10);
    app.register(MemoryIntervalToken, 1000 * 10);
    app.register(SocketIntervalToken, 1000 * 10);
  }
  app.register(BrowserPerformanceEmitter);
  // const Logger = app.register(LoggerToken, UniversalLogger);
  app.register(UniversalLoggerConfigToken, loggerConfig);
  // if (__NODE__) {
  //   Logger.of().info('Hello from server!');
  // }
  app.register(ErrorHandling);
  // app.register(ErrorHandlerToken, e => Logger.of().error(e));
  app.register(ErrorHandlerToken, e => console.log('error!', e));
  // app.register(CsrfProtectionExample);

  return app;
}
