import { logImage } from "./gif-logger";

export type Error = {
  msg: string;
};

export type ErrorMessage = {
  message: Event | string;
  source?: string;
  lineno?: number;
  colno?: number;
  error?: any;
};

const maxErrorsToLog = 10;
var i = 0;

export const logErrors = (
  message: Event | string,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: any
): boolean => {
  // don't log more than i events per rid
  if (i < maxErrorsToLog) {
    i++;

    const ErrorToLog: Error = {
      msg: window.btoa(
        JSON.stringify({
          message,
          source,
          lineno,
          colno,
          error
        })
      )
    };

    logImage("error", ErrorToLog);
  }

  var suppressErrorAlert = true;
  return suppressErrorAlert;
};

// catch and track errors
window.onerror = logErrors;
