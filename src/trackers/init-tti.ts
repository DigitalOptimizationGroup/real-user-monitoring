import { logImage, EventType } from "./gif-logger";

export type LongTasksTiming = {
  type: EventType.LongTasksTiming;
  entry: string;
};

// this is part of setting up the TTI pollyfill
// https://github.com/GoogleChromeLabs/tti-polyfill
if ("PerformanceLongTaskTiming" in window) {
  var g: any = (window.__tti = { e: [] });
  g.o = new window.PerformanceObserver(function(l: any) {
    l.getEntries().forEach((entry: LongTasksTiming) => {
      const event = {
        type: EventType.LongTasksTiming,
        entry: JSON.stringify(entry)
      };
      logImage(event);
    });
    g.e = g.e.concat(l.getEntries());
  });
  g.o.observe({ entryTypes: ["longtask"] });
}
