import { logPerformance } from "./log-performance";
import { logImage, BasePerfEvent } from "./gif-logger";
import { EventType } from "./gif-logger";

export interface AssetTiming extends BasePerfEvent {
  type: EventType.AssetLoadTime;
  protocol: PerformanceResourceTiming["nextHopProtocol"];
  asset: PerformanceResourceTiming["name"];
  time: string;
  dns: string;
}

var timeToFistByteLogged: boolean,
  dnsLookupTimeLogged: boolean,
  timeToFetchStartLogged: boolean,
  timeToHtmlPageLogged: boolean,
  domInteractiveLogged: boolean;

const checkTiming = () => {
  var perfData = window.performance.timing;

  // Navigation to fetch start
  if (perfData.fetchStart > 0 && !timeToFetchStartLogged) {
    var timeToFetchStart = perfData.fetchStart - perfData.navigationStart;
    logPerformance("timeToFetchStart", timeToFetchStart);
    timeToFetchStartLogged = true;
  }

  // DNS query time
  if (perfData.domainLookupEnd > 0 && !dnsLookupTimeLogged) {
    var dnsLookupTime = perfData.domainLookupEnd - perfData.domainLookupStart;
    logPerformance("dnsLookupTime", dnsLookupTime);
    dnsLookupTimeLogged = true;
  }

  // Time to first byte
  if (perfData.responseStart > 0 && !timeToFistByteLogged) {
    var timeToFistByte = perfData.responseStart - perfData.fetchStart;
    logPerformance("timeToFistByte", timeToFistByte);
    timeToFistByteLogged = true;
  }

  // Time to download initial HTML page
  if (perfData.responseEnd > 0 && !timeToHtmlPageLogged) {
    var timeToHtmlPage = perfData.responseEnd - perfData.fetchStart;
    logPerformance("timeToHtmlPage", timeToHtmlPage);
    timeToHtmlPageLogged = true;
  }

  // Time to interactive
  if (perfData.domInteractive > 0 && !domInteractiveLogged) {
    var domInteractive = perfData.domInteractive - perfData.navigationStart;
    logPerformance("domInteractive", domInteractive);
    domInteractiveLogged = true;
  }

  // total load time
  if (perfData.loadEventEnd > 0) {
    clearInterval(checkTimingsAvailable);

    var pageLoadTime = perfData.loadEventEnd - perfData.fetchStart;
    logPerformance("pageLoadTime", pageLoadTime);

    // Static Asset load times
    var entries = window.performance.getEntries();

    var assetTiming = entries
      .filter(entry => {
        return (
          // filter out everything (including images) except css and js
          (entry.name.includes(".js") || entry.name.includes(".css")) &&
          // filter out anything that doesn't have greater than 0 startTime
          entry.startTime > 0
        );
      })
      .forEach((entry: PerformanceResourceTiming) => {
        const event: AssetTiming = {
          type: EventType.AssetLoadTime,
          protocol: entry.nextHopProtocol,
          asset: entry.name,
          time: Math.round(entry.responseEnd - entry.startTime).toString(),
          dns: Math.round(
            entry.domainLookupEnd - entry.domainLookupStart
          ).toString()
        };
        logImage(event);
      });

    // paint timings
    entries.forEach(entry => {
      if (entry.name === "first-contentful-paint") {
        logPerformance("firstContentfulPaint", entry.startTime);
      } else if (entry.name === "first-paint") {
        logPerformance("firstPaint", entry.startTime);
      }
    });
  }
};

var checkTimingsAvailable: NodeJS.Timeout;
const checkForTimingAvailability = () => {
  checkTimingsAvailable = setInterval(checkTiming, 1000);
  checkTiming();
};

if ("requestIdleCallback" in window) {
  // if browser has requestIdleCallback then let's wait for an idle period to do all this stuff
  window.requestIdleCallback(checkForTimingAvailability);
} else {
  checkForTimingAvailability();
}
