import ttiPolyfill from "tti-polyfill";
import Cookies from "js-cookie";
import { AppConfig } from "../../app-config";
import { logImage } from "./image-get-logger";
import { logErrors } from "./error-tracking";

type AppConfig = {
  rid: string;
  vid: string;
  startTimestamp: number;
  projectId: string;
  gifLoggerUrl: string;
};

declare global {
  interface Window {
    __APP_CONFIG__: AppConfig;
  }
}

// this is part of setting up the TTI pollyfill
// https://github.com/GoogleChromeLabs/tti-polyfill
if ("PerformanceLongTaskTiming" in window) {var g = (window.__tti = { e: [] });
  g.o = new PerformanceObserver(function(l) {
    g.e = g.e.concat(l.getEntries());
  });
  g.o.observe({ entryTypes: ["longtask"] });
}

window.__APP_CONFIG__ = Cookies.getJSON("CLIENT_CONFIG");

// catch and track errors
window.onerror = logErrors;

// track frame rate
function sendFPS(fps, nFps, delta, now) {
  new Image().src =
    window.__APP_CONFIG__.COLLECTOR_API +
    "/PERFORMANCE_TIMING" +
    [
      "?rid=" + window.__APP_CONFIG__.RID,
      "vid=" + window.__APP_CONFIG__.VID,
      "fps=" + fps,
      "n=" + nFps,
      "&d=" + Math.round(delta),
      "&t=" + Math.round(now)
    ].join("&");
}

var start = performance.now();
var fps = 0;
var frameId;
var priorFps = 0;
var numEvents = 0;
var MAX_FPS_EVENTS = 10;

function main(now) {
  fps++;
  const delta = now - start;
  if (delta >= 1000) {
    const normal = Math.round(fps / (delta / 1000));
    if (priorFps !== normal) {
      sendFPS(fps, normal, delta, now);
      numEvents++;
    }
    priorFps = normal;
    fps = 0;
    start = now;
  }
  if (numEvents <= MAX_FPS_EVENTS) {
    requestAnimationFrame(main);
  }
}
requestAnimationFrame(main);

window.NAV_START =
  typeof window.performance == "object" &&
  typeof window.performance.timing == "object"
    ? window.performance.timing.navigationStart
    : new Date().getTime();

export type ClientPing = {
  elapsedTime: number;
  language: string;
};

new Image().src =
  window.__APP_CONFIG__.COLLECTOR_API +
  "/CLIENT_PING" +
  [
    "?rid=" + window.__APP_CONFIG__.RID,
    "vid=" + window.__APP_CONFIG__.VID,
    "projectid=" + window.__APP_CONFIG__.projectId,
    "language=" + navigator.language,
    "elapsedTime=" + window.performance.now()
  ].join("&");

// log performance events
function sendPerfTiming(t, v) {
  new Image().src =
    window.__APP_CONFIG__.COLLECTOR_API +
    "/PERFORMANCE_TIMING" +
    [
      "?rid=" + window.__APP_CONFIG__.RID,
      "vid=" + window.__APP_CONFIG__.VID,
      "projectid=" + window.__APP_CONFIG__.projectId,
      "t=" + t,
      "v=" + window.encodeURIComponent(v)
    ].join("&");
}

// first input delay
!(function(n, e) {
  var t,
    o,
    i,
    c = [],
    f = { passive: !0, capture: !0 },
    r = new Date(),
    a = "pointerup",
    u = "pointercancel";
  function p(n, c) {
    t || ((t = c), (o = n), (i = new Date()), w(e), s());
  }
  function s() {
    o >= 0 &&
      o < i - r &&
      (c.forEach(function(n) {
        n(o, t);
      }),
      (c = []));
  }
  function l(t) {
    if (t.cancelable) {
      var o =
        (t.timeStamp > 1e12 ? new Date() : performance.now()) - t.timeStamp;
      "pointerdown" == t.type
        ? (function(t, o) {
            function i() {
              p(t, o), r();
            }
            function c() {
              r();
            }
            function r() {
              e(a, i, f), e(u, c, f);
            }
            n(a, i, f), n(u, c, f);
          })(o, t)
        : p(o, t);
    }
  }
  function w(n) {
    ["click", "mousedown", "keydown", "touchstart", "pointerdown"].forEach(
      function(e) {
        n(e, l, f);
      }
    );
  }
  w(n),
    (self.perfMetrics = self.perfMetrics || {}),
    (self.perfMetrics.onFirstInputDelay = function(n) {
      c.push(n), s();
    });
})(addEventListener, removeEventListener);

perfMetrics.onFirstInputDelay(function(delay, evt) {
  sendPerfTiming("firstInputDelay", Math.round(delay));
});

var timeToFistByteLogged,
  dnsLookupTimeLogged,
  timeToFetchStartLogged,
  timeToHtmlPageLogged,
  domInteractiveLogged;
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

    new Image().src =
      window.__APP_CONFIG__.COLLECTOR_API +
      "/STATIC_ASSET_LOAD_TIMES" +
      [
        "?rid=" + window.__APP_CONFIG__.RID,
        "vid=" + window.__APP_CONFIG__.VID,
        "projectid=" + window.__APP_CONFIG__.projectId,
        "assets=" + JSON.stringify(assetTiming)
      ].join("&");

    // paint timings
    entries
      .filter(function(entry) {
        return entry.entryType === "paint";
      })
      .forEach(function(entry) {
        new Image().src =
          window.__APP_CONFIG__.COLLECTOR_API +
          "/PERFORMANCE_TIMING" +
          [
            "?rid=" + window.__APP_CONFIG__.RID,
            "vid=" + window.__APP_CONFIG__.VID,
            "projectid=" + window.__APP_CONFIG__.projectId,
            "t=" +
              {
                "first-contentful-paint": "firstContentfulPaint",
                "first-paint": "firstPaint"
              }[entry.name],
            "v=" + entry.startTime
          ].join("&");
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
