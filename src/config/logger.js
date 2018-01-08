function getLoggerConfig() {
  if (__NODE__) {
    const winston = require('winston');
    return {
      transports: [new winston.transports.Console()],
    };
  }
  return null;
}

export default getLoggerConfig();
