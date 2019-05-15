// this is part of setting up the TTI pollyfill
// https://github.com/GoogleChromeLabs/tti-polyfill
// prettier-ignore
!function(){if('PerformanceLongTaskTiming' in window){var g=window.__tti={e:[]};
g.o=new window.PerformanceObserver(function(l){g.e=g.e.concat(l.getEntries())});
g.o.observe({entryTypes:['longtask']})}}();
