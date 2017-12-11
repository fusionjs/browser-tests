import App from 'fusion-react';
import JWTSession from 'fusion-plugin-jwt';
import CsrfProtection from 'fusion-plugin-csrf-protection-react';
import Router from 'fusion-plugin-react-router';
import I18n from 'fusion-plugin-i18n-react';
import UniversalEvents from 'fusion-plugin-universal-events-react';
import UniversalLogger from 'fusion-plugin-universal-logger';
import Styletron from 'fusion-plugin-styletron-react';
import {FontPlugin} from 'fusion-plugin-font-loading';
import RPC from 'fusion-plugin-rpc-redux-react';
import Redux from 'fusion-plugin-react-redux';
import ErrorHandling from 'fusion-plugin-error-handling';
import NodePerformanceEmitter from 'fusion-plugin-node-performance-emitter';
import BrowserPerformanceEmitter from 'fusion-plugin-browser-performance-emitter';
import actionEmitter from 'fusion-redux-action-emitter-enhancer';

import unfetch from 'unfetch';

import loggerConfig from './config/logger';

import root from './components/root';
import rpcExample from './rpc/rpc-example';
import CsrfProtectionExample from './rpc/csrf-protection-example';
import reducer from './reducers/root';
import {Plugin} from 'fusion-core';

import {preloadDepth, fonts} from './font-config.js';

const MemoryTranslationsLoader = new Plugin({
  Service: class MemoryTranslations {
    constructor() {
      if (__NODE__) {
        this.locale = 'en-US';
        this.translations = require('../translations/en-US.json');
      }
    }
  },
});

export default function start() {
  const app = new App(root);

  // TODO: Secrets should never be hard-coded, and ideally should not be in version control
  const Session = app.plugin(JWTSession, {secret: __NODE__ ? 'abcdefg' : ''});
  const {fetch, ignore} = app
    .plugin(CsrfProtection, {
      Session,
      fetch: unfetch,
    })
    .of();
  const EventEmitter = app.plugin(UniversalEvents, {fetch});

  app.plugin(Router, {EventEmitter});
  app.plugin(Styletron);
  app.plugin(FontPlugin, {preloadDepth, fonts});
  app.plugin(
    I18n,
    __BROWSER__ ? {fetch} : {TranslationsLoader: MemoryTranslationsLoader}
  );
  app.plugin(Redux, {reducer, enhancer: actionEmitter(EventEmitter)});
  app.plugin(RPC, {handlers: __NODE__ && rpcExample(), fetch});

  if (__NODE__) {
    const nodePerfConfig = {
      eventLoopLagInterval: 1000 * 10,
      memoryInterval: 1000 * 10,
      socketInterval: 1000 * 10,
    };
    app.plugin(NodePerformanceEmitter, {
      config: nodePerfConfig,
      EventEmitter,
    });
  }
  app.plugin(BrowserPerformanceEmitter, {EventEmitter});
  const Logger = app.plugin(UniversalLogger, {
    UniversalEvents: EventEmitter,
    config: loggerConfig,
  });
  if (__NODE__) {
    Logger.of().info('Hello from server!');
  }

  app.plugin(ErrorHandling, {
    onError: e => Logger.of().error(e),
    CsrfProtection: {ignore},
  });

  app.plugin(CsrfProtectionExample);

  return app;
}
