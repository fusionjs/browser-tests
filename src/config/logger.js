let loggerConfig = null;
if (__NODE__) {
  const winston = require('winston');
  loggerConfig = {
    transports: [new winston.transports.Console()],
  };
}
export default loggerConfig;
