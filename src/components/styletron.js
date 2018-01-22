/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {styled} from 'fusion-plugin-styletron-react';

const FancyContainer = styled('div', {
  background: 'lightgreen',
  border: '5px solid pink',
});
const FancyLink = styled('a', props => ({
  ':hover': {fontSize: `${props.answer}px`},
}));

export default function StyletronComponent() {
  return (
    <FancyContainer>
      Styled!
      <FancyLink href="#" answer={42}>
        Answer to Life, the Universe and Everything
      </FancyLink>
    </FancyContainer>
  );
}
