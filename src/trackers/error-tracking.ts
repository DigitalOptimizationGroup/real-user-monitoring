import { logImage } from "./gif-logger";
import { EventType, BasePerfEvent } from "./gif-logger";

export interface Error extends BasePerfEvent {
  type: EventType.Error;
  message: string;
  source: string;
  lineno: string;
  colno: string;
  error: string;
}

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

    const event: Error = {
      type: EventType.Error,
      message: JSON.stringify(message) || "NA",
      source: source || "NA",
      lineno: (lineno && lineno.toString()) || "NA",
      colno: (colno && colno.toString()) || "NA",
      error: JSON.stringify(error) || "NA"
    };

    logImage(event);
  }

  var suppressErrorAlert = true;
  return suppressErrorAlert;
};

// catch and track errors
window.onerror = logErrors;
