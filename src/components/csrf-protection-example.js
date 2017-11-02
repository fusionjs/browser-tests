import React from 'react';
import {withCsrfProtection} from 'fusion-plugin-csrf-protection-react';

class FetchingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      status: null,
    };
  }
  componentDidMount() {
    const {fetch} = this.props.csrfProtection;
    fetch('/test-fetch', {method: 'POST'}).then(resp => {
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

export default withCsrfProtection(FetchingComponent);
