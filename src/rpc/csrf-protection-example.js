export default () => (ctx, next) => {
  if (ctx.path === ctx.prefix + '/test-fetch' && ctx.method === 'POST') {
    ctx.body = 'hello world';
  }
  return next();
};
