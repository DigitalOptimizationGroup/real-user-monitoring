import { logImage } from "./gif-logger";
import { EventType, BasePerfEvent } from "./gif-logger";

export type PerformanceTimingProperty =
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

export interface PerformanceTiming extends BasePerfEvent {
  type: EventType.PerformanceTiming;
  property: PerformanceTimingProperty;
  duration: string;
}

export const logPerformance = (
  property: PerformanceTimingProperty,
  duration: number
) => {
  const event: PerformanceTiming = {
    type: EventType.PerformanceTiming,
    property,
    duration: Math.round(duration).toString()
  };
  logImage(event);
};
