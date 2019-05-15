import { logImage } from "./gif-logger";
import { EventType, BasePerfEvent } from "./gif-logger";

export type PerformanceEventName =
  | "timeToFetchStart"
  | "dnsLookupTime"
  | "timeToFistByte"
  | "timeToHtmlPage"
  | "domInteractive"
  | "pageLoadTime"
  | "firstContentfulPaint"
  | "firstPaint"
  | "firstInputDelay"
  | "fps"
  | "tti";

export interface Performance extends BasePerfEvent {
  type: EventType.Performance;
  name: PerformanceEventName;
  value: string;
}

export const logPerformance = (name: PerformanceEventName, value: number) => {
  const event: Performance = {
    type: EventType.Performance,
    name,
    value: Math.round(value).toString()
  };
  logImage(event);
};
