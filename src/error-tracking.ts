import { logImage } from "./image-get-logger";

export type ERRORS = {
  rid: string;
  vid: string;
  startTimestamp: string;
  clientTime: string;
  msg: string;
};

var i = 0;
export const logErrors = (loggingUrl: string, maxErrorsToLog: number = 10) => (
  msg: string,
  url: string,
  line: number,
  col: number,
  error: Error
) => {
  // don't log more than i events per rid
  if (i < maxErrorsToLog) {
    i++;

    const ErrorToLog: ERRORS = {
      rid: window.__APP_CONFIG__.rid,
      vid: window.__APP_CONFIG__.vid,
      startTimestamp: window.__APP_CONFIG__.startTimestamp.toString(),
      clientTime: window.performance && window.performance.now().toString(),
      msg: window.btoa(
        JSON.stringify({
          type: "ERROR",
          payload: {
            msg: msg,
            url: url,
            line: line,
            col: col,
            error: error
          }
        })
      )
    };

    logImage("error", ErrorToLog);

    var suppressErrorAlert = true;
    return suppressErrorAlert;
  }
};