# Using Embedded Trackers

To utilize this library requires embedding JS into your HTML and loading an async script to finish the job.

```js
<head>
    <script>
        window.__APP_CONFIG__ = {rid: "123", vid: "abc", startTimestamp: 234234, projectId: "my-project", gifLoggerUrl: "fqdn"};
    </script>
    <script>
        !function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=8)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});const r={rid:window.__APP_CONFIG__.rid,vid:window.__APP_CONFIG__.vid,startTimestamp:window.__APP_CONFIG__.startTimestamp.toString(),clientTime:window.performance&&window.performance.now().toString()};n.logImage=((e,n,t=window.__APP_CONFIG__.gifLoggerUrl)=>{const o=Object.keys(Object.assign({},r,n)).map(e=>n[e]).join("&");(new Image).src=`${t}/${e}?${o}`})},,,,,,,,function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),t(9),t(10),t(11),t(12)},function(e,n){!function(e,n){var t,r,o,i=[],c={passive:!0,capture:!0},u=new Date,a="pointerup",f="pointercancel";function s(e,i){t||(t=i,r=e,o=new Date,p(n),l())}function l(){r>=0&&r<o-u&&(i.forEach(function(e){e(r,t)}),i=[])}function d(t){if(t.cancelable){var r=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;"pointerdown"==t.type?function(t,r){function o(){s(t,r),u()}function i(){u()}function u(){n(a,o,c),n(f,i,c)}e(a,o,c),e(f,i,c)}(r,t):s(r,t)}}function p(e){["click","mousedown","keydown","touchstart","pointerdown"].forEach(function(n){e(n,d,c)})}p(e),self.perfMetrics=self.perfMetrics||{},self.perfMetrics.onFirstInputDelay=function(e){i.push(e),l()}}(addEventListener,removeEventListener)},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});const r=t(0),o={language:navigator.language};r.logImage("ping",o)},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});const r=t(0);var o=0;n.logErrors=((e,n,t,i,c)=>{if(o<10){o++;const u={msg:window.btoa(JSON.stringify({type:"ERROR",payload:{msg:e,url:n,line:t,col:i,error:c}}))};r.logImage("error",u);return!0}}),window.onerror=n.logErrors},function(e,n){!function(){if("PerformanceLongTaskTiming"in window){var e=window.__tti={e:[]};e.o=new PerformanceObserver(function(n){e.e=e.e.concat(n.getEntries())}),e.o.observe({entryTypes:["longtask"]})}}()}]);
    </script>
</head>
<body>
<script async src="/static/perf.dbbc8de4b1c582d7cc9a.js"></script>
</body>
```
