module.exports={"perfHead":"!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&\"object\"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,\"default\",{enumerable:!0,value:e}),2&n&&\"string\"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,\"a\",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p=\"\",t(t.s=9)}([function(e,n,t){\"use strict\";Object.defineProperty(n,\"__esModule\",{value:!0});n.logImage=((e,n=window.__APP_CONFIG__.gifLoggerUrl)=>{const t={rid:window.__APP_CONFIG__.rid,vid:window.__APP_CONFIG__.vid,startTimestamp:window.__APP_CONFIG__.startTimestamp.toString(),projectId:window.__APP_CONFIG__.projectId,elapsedTime:Math.round(window.performance&&window.performance.now()||Date.now()).toString(),color:window.__APP_CONFIG__.color||\"NA\"},o=Object.assign({},t,e),r=()=>{const e=Object.keys(o).map(e=>`${e}=${window.encodeURIComponent(o[e])}`).join(\"&\");(new Image).src=`${n}?${e}`};\"requestIdleCallback\"in window?window.requestIdleCallback(r):r()})},,,,,,,,,function(e,n,t){\"use strict\";Object.defineProperty(n,\"__esModule\",{value:!0}),t(10),t(11),t(13),t(14)},function(e,n){!function(e,n){var t,o,r,i=[],c={passive:!0,capture:!0},u=new Date,a=\"pointerup\",f=\"pointercancel\";function s(e,i){t||(t=i,o=e,r=new Date,p(n),l())}function l(){o>=0&&o<r-u&&(i.forEach(function(e){e(o,t)}),i=[])}function d(t){if(t.cancelable){var o=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;\"pointerdown\"==t.type?function(t,o){function r(){s(t,o),u()}function i(){u()}function u(){n(a,r,c),n(f,i,c)}e(a,r,c),e(f,i,c)}(o,t):s(o,t)}}function p(e){[\"click\",\"mousedown\",\"keydown\",\"touchstart\",\"pointerdown\"].forEach(function(n){e(n,d,c)})}p(e),self.perfMetrics=self.perfMetrics||{},self.perfMetrics.onFirstInputDelay=function(e){i.push(e),l()}}(addEventListener,removeEventListener)},function(e,n,t){\"use strict\";Object.defineProperty(n,\"__esModule\",{value:!0});const o=t(0),r=t(12),i={type:\"ping\",language:navigator.language,effectiveType:r.effectiveType};o.logImage(i)},function(e,n,t){\"use strict\";Object.defineProperty(n,\"__esModule\",{value:!0});const o=window.navigator;n.effectiveType=o.connection&&o.connection.effectiveType||\"NA\"},function(e,n,t){\"use strict\";Object.defineProperty(n,\"__esModule\",{value:!0});const o=t(0);var r=0;n.logErrors=((e,n,t,i,c)=>{if(r<10){r++;const u={type:\"errorLog\",message:JSON.stringify(e)||\"NA\",source:n||\"NA\",lineno:t&&t.toString()||\"NA\",colno:i&&i.toString()||\"NA\",error:JSON.stringify(c)||\"NA\"};o.logImage(u)}return!0}),window.onerror=n.logErrors},function(e,n,t){\"use strict\";Object.defineProperty(n,\"__esModule\",{value:!0});const o=t(0);if(\"PerformanceLongTaskTiming\"in window){var r=window.__tti={e:[]};r.o=new window.PerformanceObserver(function(e){e.getEntries().forEach(e=>{const n={type:\"longTasksTiming\",entry:JSON.stringify(e)};o.logImage(n)}),r.e=r.e.concat(e.getEntries())}),r.o.observe({entryTypes:[\"longtask\"]})}}]);","perfBody":"!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(t,\"__esModule\",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&\"object\"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,\"default\",{enumerable:!0,value:t}),2&e&&\"string\"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,\"a\",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p=\"\",n(n.s=2)}([function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});e.logImage=((t,e=window.__APP_CONFIG__.gifLoggerUrl)=>{const n={rid:window.__APP_CONFIG__.rid,vid:window.__APP_CONFIG__.vid,startTimestamp:window.__APP_CONFIG__.startTimestamp.toString(),projectId:window.__APP_CONFIG__.projectId,elapsedTime:Math.round(window.performance&&window.performance.now()||Date.now()).toString(),color:window.__APP_CONFIG__.color||\"NA\"},r=Object.assign({},n,t),o=()=>{const t=Object.keys(r).map(t=>`${t}=${window.encodeURIComponent(r[t])}`).join(\"&\");(new Image).src=`${e}?${t}`};\"requestIdleCallback\"in window?window.requestIdleCallback(o):o()})},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});const r=n(0);e.logPerformance=((t,e)=>{const n={type:\"performanceTiming\",property:t,duration:Math.round(e).toString()};r.logImage(n)})},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0}),n(3),n(6),n(7),n(8)},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});const r=n(1),o=n(4),i=()=>{o.getFirstConsistentlyInteractive({}).then(t=>{t>0&&r.logPerformance(\"tti\",t)})};\"requestIdleCallback\"in window?window.requestIdleCallback(i):i()},function(t,e,n){(function(n){var r;!function(){var o=\"undefined\"!=typeof window&&window===this?this:void 0!==n&&null!=n?n:this,i=\"function\"==typeof Object.defineProperties?Object.defineProperty:function(t,e,n){t!=Array.prototype&&t!=Object.prototype&&(t[e]=n.value)};function a(){a=function(){},o.Symbol||(o.Symbol=u)}var s=0;function u(t){return\"jscomp_symbol_\"+(t||\"\")+s++}function c(){a();var t=o.Symbol.iterator;t||(t=o.Symbol.iterator=o.Symbol(\"iterator\")),\"function\"!=typeof Array.prototype[t]&&i(Array.prototype,t,{configurable:!0,writable:!0,value:function(){return d(this)}}),c=function(){}}function d(t){var e=0;return function(t){return c(),(t={next:t})[o.Symbol.iterator]=function(){return this},t}(function(){return e<t.length?{done:!1,value:t[e++]}:{done:!0}})}function f(t){c();var e=t[Symbol.iterator];return e?e.call(t):d(t)}function l(t){if(!(t instanceof Array)){t=f(t);for(var e,n=[];!(e=t.next()).done;)n.push(e.value);t=n}return t}var p=0;var m=\"img script iframe link audio video source\".split(\" \");function v(t,e){for(var n=(t=f(t)).next();!n.done;n=t.next())if(n=n.value,e.includes(n.nodeName.toLowerCase())||v(n.children,e))return!0;return!1}function h(t,e){if(2<t.length)return performance.now();for(var n=[],r=(e=f(e)).next();!r.done;r=e.next())r=r.value,n.push({timestamp:r.start,type:\"requestStart\"}),n.push({timestamp:r.end,type:\"requestEnd\"});for(r=(e=f(t)).next();!r.done;r=e.next())n.push({timestamp:r.value,type:\"requestStart\"});for(n.sort(function(t,e){return t.timestamp-e.timestamp}),t=t.length,e=n.length-1;0<=e;e--)switch(r=n[e],r.type){case\"requestStart\":t--;break;case\"requestEnd\":if(2<++t)return r.timestamp;break;default:throw Error(\"Internal Error: This should never happen\")}return 0}function w(t){t=t||{},this.w=!!t.useMutationObserver,this.u=t.minValue||null,t=window.__tti&&window.__tti.e;var e=window.__tti&&window.__tti.o;this.a=t?t.map(function(t){return{start:t.startTime,end:t.startTime+t.duration}}):[],e&&e.disconnect(),this.b=[],this.f=new Map,this.j=null,this.v=-1/0,this.i=!1,this.h=this.c=this.s=null,function(t,e){var n=XMLHttpRequest.prototype.send,r=p++;XMLHttpRequest.prototype.send=function(o){for(var i=[],a=0;a<arguments.length;++a)i[a-0]=arguments[a];var s=this;return t(r),this.addEventListener(\"readystatechange\",function(){4===s.readyState&&e(r)}),n.apply(this,i)}}(this.m.bind(this),this.l.bind(this)),function(t,e){var n=fetch;fetch=function(r){for(var o=[],i=0;i<arguments.length;++i)o[i-0]=arguments[i];return new Promise(function(r,i){var a=p++;t(a),n.apply(null,[].concat(l(o))).then(function(t){e(a),r(t)},function(t){e(t),i(t)})})}}(this.m.bind(this),this.l.bind(this)),function(t){t.c=new PerformanceObserver(function(e){for(var n=(e=f(e.getEntries())).next();!n.done;n=e.next())if(\"resource\"===(n=n.value).entryType&&(t.b.push({start:n.fetchStart,end:n.responseEnd}),y(t,h(t.g,t.b)+5e3)),\"longtask\"===n.entryType){var r=n.startTime+n.duration;t.a.push({start:n.startTime,end:r}),y(t,r+5e3)}}),t.c.observe({entryTypes:[\"longtask\",\"resource\"]})}(this),this.w&&(this.h=function(t){var e=new MutationObserver(function(e){for(var n=(e=f(e)).next();!n.done;n=e.next())\"childList\"==(n=n.value).type&&v(n.addedNodes,m)?t(n):\"attributes\"==n.type&&m.includes(n.target.tagName.toLowerCase())&&t(n)});return e.observe(document,{attributes:!0,childList:!0,subtree:!0,attributeFilter:[\"href\",\"src\"]}),e}(this.B.bind(this)))}function g(t){t.i=!0;var e=0<t.a.length?t.a[t.a.length-1].end:0,n=h(t.g,t.b);y(t,Math.max(n+5e3,e))}function y(t,e){!t.i||t.v>e||(clearTimeout(t.j),t.j=setTimeout(function(){var e=performance.timing.navigationStart,n=h(t.g,t.b);e=(window.a&&window.a.A?1e3*window.a.A().C-e:0)||performance.timing.domContentLoadedEventEnd-e;if(t.u)var r=t.u;else performance.timing.domContentLoadedEventEnd?r=(r=performance.timing).domContentLoadedEventEnd-r.navigationStart:r=null;var o=performance.now();null===r&&y(t,Math.max(n+5e3,o+1e3));var i=t.a;5e3>o-n?n=null:n=5e3>o-(n=i.length?i[i.length-1].end:e)?null:Math.max(n,r),n&&(t.s(n),clearTimeout(t.j),t.i=!1,t.c&&t.c.disconnect(),t.h&&t.h.disconnect()),y(t,performance.now()+1e3)},e-performance.now()),t.v=e)}w.prototype.getFirstConsistentlyInteractive=function(){var t=this;return new Promise(function(e){t.s=e,\"complete\"==document.readyState?g(t):window.addEventListener(\"load\",function(){g(t)})})},w.prototype.m=function(t){this.f.set(t,performance.now())},w.prototype.l=function(t){this.f.delete(t)},w.prototype.B=function(){y(this,performance.now()+5e3)},o.Object.defineProperties(w.prototype,{g:{configurable:!0,enumerable:!0,get:function(){return[].concat(l(this.f.values()))}}});var b={getFirstConsistentlyInteractive:function(t){return t=t||{},\"PerformanceLongTaskTiming\"in window?new w(t).getFirstConsistentlyInteractive():Promise.resolve(null)}};t.exports?t.exports=b:void 0===(r=function(){return b}.apply(e,[]))||(t.exports=r)}()}).call(this,n(5))},function(t,e){var n;n=function(){return this}();try{n=n||new Function(\"return this\")()}catch(t){\"object\"==typeof window&&(n=window)}t.exports=n},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});const r=n(1),o=n(0);var i,a,s,u,c;const d=()=>{var t=window.performance.timing;if(t.fetchStart>0&&!s){var e=t.fetchStart-t.navigationStart;r.logPerformance(\"timeToFetchStart\",e),s=!0}if(t.domainLookupEnd>0&&!a){var n=t.domainLookupEnd-t.domainLookupStart;r.logPerformance(\"dnsLookupTime\",n),a=!0}if(t.responseStart>0&&!i){var d=t.responseStart-t.fetchStart;r.logPerformance(\"timeToFistByte\",d),i=!0}if(t.responseEnd>0&&!u){var l=t.responseEnd-t.fetchStart;r.logPerformance(\"timeToHtmlPage\",l),u=!0}if(t.domInteractive>0&&!c){var p=t.domInteractive-t.navigationStart;r.logPerformance(\"domInteractive\",p),c=!0}if(t.loadEventEnd>0){clearInterval(f);var m=t.loadEventEnd-t.fetchStart;r.logPerformance(\"pageLoadTime\",m);var v=window.performance.getEntries();v.filter(t=>(t.name.includes(\".js\")||t.name.includes(\".css\"))&&t.startTime>0).forEach(t=>{const e={type:\"assetTiming\",protocol:t.nextHopProtocol,asset:t.name,duration:Math.round(t.responseEnd-t.startTime).toString(),dns:Math.round(t.domainLookupEnd-t.domainLookupStart).toString()};o.logImage(e)});v.forEach(t=>{\"first-contentful-paint\"===t.name?r.logPerformance(\"firstContentfulPaint\",t.startTime):\"first-paint\"===t.name&&r.logPerformance(\"firstPaint\",t.startTime)})}};var f;const l=()=>{f=setInterval(d,1e3),d()};\"requestIdleCallback\"in window?window.requestIdleCallback(l):l()},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});const r=n(1);\"perfMetrics\"in window&&window.perfMetrics.onFirstInputDelay(t=>{r.logPerformance(\"firstInputDelay\",Math.round(t))})},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});const r=n(0);var o=performance.now(),i=0,a=0,s=0;const u=t=>{i++;const e=t-o;if(e>=1e3){const n=Math.round(i/(e/1e3));if(a!==n&&n<50){const o={type:\"fps\",fps:n.toString(),delta:Math.round(e).toString(),clientTime:Math.round(t).toString()};r.logImage(o),s++}a=n,i=0,o=t}s<=10&&requestAnimationFrame(u)};requestAnimationFrame(u)}]);","headHash":"54fc3e7dd99d199ab1e9dd03699934b4aee9e2c3","bodyHash":"f909895da9a1c88a9b7dae8faa4bd97418ea5b06"}