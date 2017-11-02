import React from 'react';
import {withRPC} from 'fusion-plugin-rpc-react';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: null,
      loading: true,
      error: '',
    };
  }
  componentDidMount() {
    this.props.rpc.echo({test: 'hello'}).then(({test}) => {
      this.setState({test});
    });
    this.doRPC(this.props.rpc.getCount);
  }
  increment() {
    this.doRPC(this.props.rpc.increment);
  }
  decrement() {
    this.doRPC(this.props.rpc.decrement);
  }
  doRPC(method) {
    return method()
      .then(({rpcCount, error}) => {
        this.setState({
          loading: false,
          rpcCount,
          error,
        });
      })
      .catch(e => {
        this.setState({error: e.message});
      });
  }
  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <p>{this.state.test}</p>
        <p>Count: {this.state.rpcCount}</p>
        <p>
          <button onClick={() => this.increment()}>Increment</button>
          <button onClick={() => this.decrement()}>Decrement</button>
        </p>
        {this.state.error}
      </div>
    );
  }
}

export default withRPC(Example);
