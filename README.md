# Real User Performance Monitoring

This library has been designed to work with Digital Optimization Group's Application Delivery Network. It can be automatically added to your application running on our network.

It may also be used as a standalone library, but will require the user to log events to their own `gif` server / event collector.

# Using Embedded Trackers

To utilize this library requires embedding JS into your HTML and loading an async script to finish the job.

The head should come from `dist/head.[chunkhash].js`
The body should come from `dist/boyd.[chunkhash].js`

```html
<head>
    <script>
        window.__APP_CONFIG__ = {rid: "123", vid: "abc", startTimestamp: 234234, projectId: "my-project", gifLoggerUrl: "fqdn"};
    </script>
    <script>
        !function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=8)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.requestInfo={rid:window.__APP_CONFIG__.rid,vid:window.__APP_CONFIG__.vid,startTimestamp:window.__APP_CONFIG__.startTimestamp.toString(),clientTime:window.performance&&window.performance.now().toString()},n.logImage=((e,t=window.__APP_CONFIG__.gifLoggerUrl)=>{const o=()=>{const o=Object.keys(Object.assign({},n.requestInfo,e)).map(n=>`${n}=${window.encodeURIComponent(e[n])}`).join("&");(new Image).src=`${t}?${o}`};"requestIdleCallback"in window?window.requestIdleCallback(o):o()})},,,,,,,,function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),t(9),t(10),t(12),t(13)},function(e,n){!function(e,n){var t,o,r,i=[],c={passive:!0,capture:!0},u=new Date,f="pointerup",a="pointercancel";function s(e,i){t||(t=i,o=e,r=new Date,p(n),l())}function l(){o>=0&&o<r-u&&(i.forEach(function(e){e(o,t)}),i=[])}function d(t){if(t.cancelable){var o=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;"pointerdown"==t.type?function(t,o){function r(){s(t,o),u()}function i(){u()}function u(){n(f,r,c),n(a,i,c)}e(f,r,c),e(a,i,c)}(o,t):s(o,t)}}function p(e){["click","mousedown","keydown","touchstart","pointerdown"].forEach(function(n){e(n,d,c)})}p(e),self.perfMetrics=self.perfMetrics||{},self.perfMetrics.onFirstInputDelay=function(e){i.push(e),l()}}(addEventListener,removeEventListener)},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});const o=t(0),r=t(11),i={type:"ping",language:navigator.language,effectiveType:r.effectiveType};o.logImage(i)},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});const o=window.navigator;n.effectiveType=o.connection&&o.connection.effectiveType||"NA"},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});const o=t(0);var r=0;n.logErrors=((e,n,t,i,c)=>{if(r<10){r++;const u={type:"error",message:JSON.stringify(e)||"NA",source:n||"NA",lineno:t&&t.toString()||"NA",colno:i&&i.toString()||"NA",error:c||"NA"};o.logImage(u)}return!0}),window.onerror=n.logErrors},function(e,n){!function(){if("PerformanceLongTaskTiming"in window){var e=window.__tti={e:[]};e.o=new PerformanceObserver(function(n){e.e=e.e.concat(n.getEntries())}),e.o.observe({entryTypes:["longtask"]})}}()}]);
    </script>
</head>
<body>
<script async src="/static/perf.dbbc8de4b1c582d7cc9a.js"></script>
</body>
```
