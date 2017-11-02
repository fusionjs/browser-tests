export default (/* some provisioned db/micro-service */) => {
  if (__NODE__) {
    let rpcCount = 0; // we're storing things in memory for this example
    return {
      echo(arg) {
        return arg;
      },
      getCount() {
        return {rpcCount}; // normally we'd call some data store or microservice API here
      },
      increment() {
        if (rpcCount > 5) throw new Error('Test error');
        rpcCount++;
        return {rpcCount};
      },
      decrement() {
        rpcCount--;
        return {rpcCount};
      },
    };
  }
};
