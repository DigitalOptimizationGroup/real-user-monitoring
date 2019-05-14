# Using Embedded Trackers

To utilize this library requires embedding JS into your HTML.

```js
<head>
    <script>
        window.__APP_CONFIG__ = {rid: "123", vid: "abc", startTimestamp: 234234}; // or simple code here to get a single cookie and set that from the proxy.
    </script>
    <script>
        // Ping 
        // TTI init script
        // Error tracking (best here so you can capture any error that may occur loading other scripts)
        // abandon ping (not really needed because we get a ping & then we either get or we don't other stuff)
        // https://github.com/GoogleChromeLabs/tti-polyfill
        if ("PerformanceLongTaskTiming" in window) {var g = (window.__tti = { e: [] });
          g.o = new PerformanceObserver(function(l) {
            g.e = g.e.concat(l.getEntries());
          });
          g.o.observe({ entryTypes: ["longtask"] });
        }
    </script>
</head>
<body>
<script async src="perf.js"></script>
</body>
```