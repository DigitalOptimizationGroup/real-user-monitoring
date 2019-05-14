// this is part of setting up the TTI pollyfill
// https://github.com/GoogleChromeLabs/tti-polyfill
if ("PerformanceLongTaskTiming" in window) {var g = (window.__tti = { e: [] });
  g.o = new PerformanceObserver(function(l) {
    g.e = g.e.concat(l.getEntries());
  });
  g.o.observe({ entryTypes: ["longtask"] });
}