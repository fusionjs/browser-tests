/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import {withFetch} from 'fusion-plugin-csrf-protection-react';

type Props = {
  fetch: (a: string, ops: {}) => Promise<*>,
};

type State = {
  loading?: boolean,
  status: ?string,
};

class FetchingComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      status: null,
    };
  }

  componentDidMount() {
    const {fetch} = this.props;
    fetch('/test-fetch', {method: 'POST'}).then((resp: {status: string}) => {
      this.setState({
        loading: false,
        status: resp.status,
      });
    });
  }
  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return <div>Fetch request responded with: {this.state.status}</div>;
  }
}

export default withFetch(FetchingComponent);
