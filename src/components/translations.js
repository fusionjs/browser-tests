import React from 'react';
import {Translate, withTranslations} from 'fusion-plugin-i18n-react';

export default withTranslations(['raw', 'interpolated'])(({translate}) => {
  return (
    <div>
      <h1>Translations example</h1>
      <ul>
        <li>{translate('raw')}</li>
        <li id="doge-translation">
          {translate('interpolated', {thing: 'doge'})}
        </li>
        <li>
          <Translate id="some.translation.key" />
        </li>
      </ul>
    </div>
  );
});
