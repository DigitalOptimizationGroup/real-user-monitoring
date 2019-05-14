import { logImage } from "./gif-logger";

export type ERRORS = {
  msg: string;
};

const maxErrorsToLog = 10;
var i = 0;
export const logErrors = (
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

// catch and track errors
window.onerror = logErrors;
