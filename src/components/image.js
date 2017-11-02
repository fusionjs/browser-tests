import React from 'react';
import {assetUrl} from 'fusion-core';

export default function Image() {
  return <img src={assetUrl('../../static/test.png')} />;
}
