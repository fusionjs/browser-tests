/*
Purpose
1) Data for @font-face generation
2) Used to build an in-memory font fallback tree at runtime
3) Fallbacks at and above the specified preloadDepth will be preloaded/prefetched on page load
4) Remaining fonts will lazily load, text will temporarily use fallback font until the font has loaded
*/

import {assetUrl} from 'fusion-core';
export const preloadDepth = 1;
export const fonts = {
  'ClanPro-Book': {
    urls: {
      woff2: assetUrl('./static/Clan-Book.woff2'),
    },
    fallback: {
      name: 'Helvetica',
    },
  },
  'ClanPro-News': {
    urls: {
      woff2: assetUrl('./static/Clan-News.woff2'),
    },
    fallback: {
      name: 'ClanPro-Book',
      styles: {
        fontWeight: 'bold',
      },
    },
  },
  'ClanPro-Thin': {
    urls: {
      woff2: assetUrl('./static/Clan-Thin.woff2'),
    },
    fallback: {
      name: 'ClanPro-Book',
      styles: {
        fontWeight: '100',
      },
    },
  },
};
