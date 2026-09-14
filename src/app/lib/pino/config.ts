import pino from "pino";

const isDevelopment = process.env.NODE_ENV !== "production";

const pinoConfig = pino({
  base: isDevelopment ? undefined : null,
  level: isDevelopment ? "debug" : "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  serializers: {
    err: pino.stdSerializers.err,
  },
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      'res.headers["set-cookie"]',
      'res-headers["api-secret"]',
    ],
    remove: true,
  },
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname,time",
          ljs_stats: false,
        },
      }
    : undefined,
});

export default pinoConfig;
