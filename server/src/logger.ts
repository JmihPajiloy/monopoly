// import { addColors, createLogger, format, transports } from "winston";
//
// const config = {
//   levels: {
//     error: 0,
//     debug: 1,
//     warn: 2,
//     data: 3,
//     info: 4,
//     verbose: 5,
//     silly: 6,
//     custom: 7
//   },
//   colors: {
//     error: "red",
//     debug: "blue",
//     warn: "yellow",
//     data: "grey",
//     info: "cyan",
//     verbose: "green",
//     silly: "magenta",
//     custom: "yellow"
//   }
// };
//
// addColors(config.colors);
//
// const logger = createLogger({
//   levels: config.levels,
//   format: format.combine(
//     format.timestamp({ format: "HH:mm:ss" }),
//     format.printf(
//       (info): string =>
//         `\x1b[1m\x1b[32m${info.timestamp} \x1b[90m| ${info.label} \x1b[90m|\x1b[0m\x1b[1m ${info.message}\x1b[0m`
//     )
//   ),
//   transports: [new transports.Console()]
// });

class Logger {
  constructor() {
  }

  private getTimestamp(): string {
    return new Date().toLocaleTimeString();
  }

  public info(msg: string): void {
    const timestamp: string = this.getTimestamp();
    const label: string = "\x1b[36mINFO    \x1b[0m";
    console.log(`\x1b[1m\x1b[32m${timestamp} \x1b[90m| ${label} \x1b[90m|\x1b[0m\x1b[1m ${msg}\x1b[0m`);
  }

  public chat(msg: string): void {
    const timestamp: string = this.getTimestamp();
    const label: string = "\x1b[34mCHAT    \x1b[0m";
    console.log(`\x1b[1m\x1b[32m${timestamp} \x1b[90m| ${label} \x1b[90m|\x1b[0m\x1b[1m ${msg}\x1b[0m`);
  }

  public warning(msg: string): void {
    const timestamp: string = this.getTimestamp();
    const label: string = "\x1b[33mWARNING \x1b[0m";
    console.log(`\x1b[1m\x1b[32m${timestamp} \x1b[90m| ${label} \x1b[90m|\x1b[33m\x1b[1m ${msg}\x1b[0m`);
  }

  public critical(msg: string): void {
    const timestamp: string = this.getTimestamp();
    const label: string = "\x1b[31mCRITICAL\x1b[0m";
    console.log(`\x1b[1m\x1b[32m${timestamp} \x1b[90m| ${label} \x1b[90m|\x1b[31m\x1b[1m ${msg}\x1b[0m`);
  }
}

const logger: Logger = new Logger();

export default logger;
