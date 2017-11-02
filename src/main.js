import App from 'fusion-react';
import JWTSession from 'fusion-plugin-jwt';
import CsrfProtection from 'fusion-plugin-csrf-protection-react';
import RouterPlugin from 'fusion-plugin-react-router';
import I18n from 'fusion-plugin-i18n-react';
import UniversalEventsPlugin from 'fusion-plugin-universal-events-react';
import UniversalLogger from 'fusion-plugin-universal-logger';
import loggerConfig from './config/logger';
import Styletron from 'fusion-plugin-styletron-react';
import RPC from 'fusion-plugin-rpc-react';
import Redux from 'fusion-plugin-react-redux';
import RPCRedux from 'fusion-plugin-rpc-redux-react';
import ErrorHandling from 'fusion-plugin-error-handling';
import NodePerformanceEmitter from 'fusion-plugin-node-performance-emitter';
import BrowserPerformanceEmitterPlugin from 'fusion-plugin-browser-performance-emitter';
import reduxActionEnhancerFactory from 'fusion-redux-action-emitter-enhancer';

import unfetch from 'unfetch';

import root from './components/root';
import rpcExample from './rpc/rpc-example';
import CsrfProtectionExample from './rpc/csrf-protection-example';
import reducer from './reducers/root';

export default function start() {
  const app = new App(root);

  // TODO: Secrets should never be hard-coded, and ideally should not be in version control
  const Session = app.plugin(JWTSession, {secret: __NODE__ ? 'abcdefg' : ''});
  const {fetch, ignore} = app.plugin(CsrfProtection, {
    Session,
    fetch: unfetch,
  }).Service;
  const UniversalEvents = app.plugin(UniversalEventsPlugin, {fetch});

  app.plugin(RouterPlugin, {EventEmitter: UniversalEvents});
  app.plugin(I18n, {fetch});

  const Logger = app.plugin(UniversalLogger, {
    UniversalEvents,
    config: loggerConfig,
  });
  if (__NODE__) {
    Logger.of().info('Hello from server!');
  }

  app.plugin(Styletron);
  app.plugin(CsrfProtectionExample);

  if (__NODE__) {
    const nodePerfConfig = {
      eventLoopLagInterval: 1000 * 10,
      memoryInterval: 1000 * 10,
      socketInterval: 1000 * 10,
    };
    app.plugin(NodePerformanceEmitter, {
      config: nodePerfConfig,
      EventEmitter: UniversalEvents,
    });
  }
  app.plugin(BrowserPerformanceEmitterPlugin, {EventEmitter: UniversalEvents});

  const enhancer = reduxActionEnhancerFactory(UniversalEvents);
  app.plugin(RPCRedux, {
    RPC: app.plugin(RPC, {handlers: rpcExample(), fetch}),
    Redux: app.plugin(Redux, {reducer, enhancer}),
  });

  app.plugin(ErrorHandling, {
    onError: e => console.log(e), // eslint-disable-line no-console
    CsrfProtection: {ignore},
  });

  return app;
}
