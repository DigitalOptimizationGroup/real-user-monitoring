import Cookies from "js-cookie";

it("works", () => {
  Cookies.set("CLIENT_CONFIG", {
    RID: "123",
    VID: "abc",
    COLLECTOR_API: "http://localhost"
  });

  global.Image = jest.fn(() => {
    return "";
  });

  window.performance.timing = {
    navigationStart: 1552384918387,
    unloadEventStart: 0,
    unloadEventEnd: 0,
    redirectStart: 0,
    redirectEnd: 0,
    fetchStart: 1552384918393,
    domainLookupStart: 1552384918393,
    domainLookupEnd: 1552384918393,
    connectStart: 1552384918393,
    connectEnd: 1552384918393,
    secureConnectionStart: 0,
    requestStart: 1552384918396,
    responseStart: 1552384918715,
    responseEnd: 1552384918730,
    domLoading: 1552384918725,
    domInteractive: 1552384918833,
    domContentLoadedEventStart: 1552384918921,
    domContentLoadedEventEnd: 1552384918921,
    domComplete: 1552384919702,
    loadEventStart: 1552384919702,
    loadEventEnd: 1552384919702
  };

  window.performance.getEntries = () => [
    {
      name: "https://www.example.com/bundle.css",
      entryType: "resource",
      startTime: 86.60000000963919,
      duration: 67.19999999040738,
      initiatorType: "link",
      nextHopProtocol: "h2",
      workerStart: 0,
      redirectStart: 0,
      redirectEnd: 0,
      fetchStart: 86.60000000963919,
      domainLookupStart: 86.60000000963919,
      domainLookupEnd: 186.60000000963919,
      connectStart: 186.60000000963919,
      connectEnd: 186.60000000963919,
      secureConnectionStart: 0,
      requestStart: 189.19999998761341,
      responseStart: 252.70000000600703,
      responseEnd: 253.80000000004657,
      transferSize: 5709,
      encodedBodySize: 5638,
      decodedBodySize: 44525,
      serverTiming: []
    },
    {
      name: "https://www.example.com/bundle.js",
      entryType: "resource",
      startTime: 86.60000000963919,
      duration: 67.19999999040738,
      initiatorType: "link",
      nextHopProtocol: "h2",
      workerStart: 0,
      redirectStart: 0,
      redirectEnd: 0,
      fetchStart: 86.60000000963919,
      domainLookupStart: 86.60000000963919,
      domainLookupEnd: 186.60000000963919,
      connectStart: 186.60000000963919,
      connectEnd: 186.60000000963919,
      secureConnectionStart: 0,
      requestStart: 189.19999998761341,
      responseStart: 252.70000000600703,
      responseEnd: 253.80000000004657,
      transferSize: 5709,
      encodedBodySize: 5638,
      decodedBodySize: 44525,
      serverTiming: []
    },
    {
      name: "first-paint",
      entryType: "paint",
      startTime: 167.0999999914784,
      duration: 0
    },
    {
      name: "first-contentful-paint",
      entryType: "paint",
      startTime: 235.0999999914784,
      duration: 0
    }
  ];

  require("./index");

  expect(global.Image.mock.instances).toEqual([
    { src: "http://localhost/PING?rid=123&vid=abc&lang=en-US" },
    {
      src:
        "http://localhost/PERFORMANCE_TIMING?rid=123&vid=abc&t=timeToFetchStart&v=6"
    },
    {
      src:
        "http://localhost/PERFORMANCE_TIMING?rid=123&vid=abc&t=dnsLookupTime&v=0"
    },
    {
      src:
        "http://localhost/PERFORMANCE_TIMING?rid=123&vid=abc&t=timeToFistByte&v=322"
    },
    {
      src:
        "http://localhost/PERFORMANCE_TIMING?rid=123&vid=abc&t=timeToHtmlPage&v=337"
    },
    {
      src:
        "http://localhost/PERFORMANCE_TIMING?rid=123&vid=abc&t=domInteractive&v=446"
    },
    {
      src:
        "http://localhost/PERFORMANCE_TIMING?rid=123&vid=abc&t=domInteractiveFromFetchStart&v=440"
    },
    {
      src:
        "http://localhost/PERFORMANCE_TIMING?rid=123&vid=abc&t=pageLoadTime&v=1309"
    },
    {
      src:
        'http://localhost/STATIC_ASSET_LOAD_TIMES?rid=123&vid=abc&assets=[{"protocol":"h2","asset":"https://www.example.com/bundle.css","time":167,"dns":100},{"protocol":"h2","asset":"https://www.example.com/bundle.js","time":167,"dns":100}]'
    },
    {
      src:
        "http://localhost/PERFORMANCE_TIMING?rid=123&vid=abc&t=firstPaint&v=167.0999999914784"
    },
    {
      src:
        "http://localhost/PERFORMANCE_TIMING?rid=123&vid=abc&t=firstContentfulPaint&v=235.0999999914784"
    }
  ]);
});
