import ttiPolyfill from "tti-polyfill";
import { logImage } from "./image-get-logger";


const sendPerfTiming = (t: string, v: number) =>{
    const event = {
        t,
        value: window.encodeURIComponent(v)
    }    
    
    logImage("performance", event)
}

var timeToFistByteLogged: boolean,
  dnsLookupTimeLogged: boolean,
  timeToFetchStartLogged: boolean,
  timeToHtmlPageLogged: boolean,
  domInteractiveLogged: boolean;
var attempts = 0;

function checkTiming() {
  var perfData = window.performance.timing;

  // Navigation to fetch start
  if (perfData.fetchStart > 0 && !timeToFetchStartLogged) {
    var timeToFetchStart = perfData.fetchStart - perfData.navigationStart;
    sendPerfTiming("timeToFetchStart", timeToFetchStart);
    timeToFetchStartLogged = true;
  }

  // DNS query time
  if (perfData.domainLookupEnd > 0 && !dnsLookupTimeLogged) {
    var dnsLookupTime = perfData.domainLookupEnd - perfData.domainLookupStart;
    sendPerfTiming("dnsLookupTime", dnsLookupTime);
    dnsLookupTimeLogged = true;
  }

  // Time to first byte
  if (perfData.responseStart > 0 && !timeToFistByteLogged) {
    var timeToFistByte = perfData.responseStart - perfData.fetchStart;
    sendPerfTiming("timeToFistByte", timeToFistByte);
    timeToFistByteLogged = true;
  }

  // Time to download initial HTML page
  if (perfData.responseEnd > 0 && !timeToHtmlPageLogged) {
    var timeToHtmlPage = perfData.responseEnd - perfData.fetchStart;
    sendPerfTiming("timeToHtmlPage", timeToHtmlPage);
    timeToHtmlPageLogged = true;
  }

  // Time to interactive
  if (perfData.domInteractive > 0 && !domInteractiveLogged) {
    var domInteractive = perfData.domInteractive - perfData.navigationStart;
    sendPerfTiming("domInteractive", domInteractive);
    sendPerfTiming(
      "domInteractiveFromFetchStart",
      perfData.domInteractive - perfData.fetchStart
    );
    domInteractiveLogged = true;
  }

  // total load time
  if (perfData.loadEventEnd > 0) {
    clearInterval(checkTimingsAvailable);

    var pageLoadTime = perfData.loadEventEnd - perfData.fetchStart;
    sendPerfTiming("pageLoadTime", pageLoadTime);

    // Static Asset load times
    var entries = window.performance.getEntries();

    var assetTiming = entries
      .filter(function(entry) {
        return (
          // filter out everything (including images) except css and js
          entry.name.includes(".js") || entry.name.includes(".css")
        );
      })
      .map(function(entry) {
        return {
          protocol: entry.nextHopProtocol,
          asset: entry.name,
          time:
            entry.startTime > 0
              ? Math.round(entry.responseEnd - entry.startTime)
              : "0",
          dns: Math.round(entry.domainLookupEnd - entry.domainLookupStart)
        };
      });


    logImage("asset-load-times", {assets: JSON.stringify(assetTiming)})
    
    const paintTypes: {[key: string]: string} = {
        "first-contentful-paint": "firstContentfulPaint",
        "first-paint": "firstPaint"
    }
    
    // paint timings
    entries
      .filter(function(entry) {
        return entry.entryType === "paint";
      })
      .forEach(function(entry) {
          logImage("performance", {
              t: paintTypes[entry.name],
              v: entry.startTime.toString()
          })
      });
  }

  attempts++;
  if (attempts > 35) {
    sendPerfTiming("timeoutTimingLookups", true);
    clearInterval(checkTimingsAvailable);
  }
}

var checkTimingsAvailable = setInterval(checkTiming, 1000);
checkTiming();

// the tti pollyfill
ttiPolyfill.getFirstConsistentlyInteractive({}).then(tti => {
  sendPerfTiming("tti", tti > 1 ? tti : "NA");
  document.removeEventListener("visibilitychange", window.__trackAbandons);
});
