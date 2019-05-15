it("logs performance timing api events", () => {
  const logImage = jest.fn();

  jest.mock("../trackers/gif-logger", () => ({
    logImage
  }));

  Object.defineProperty(window, "performance", {
    configurable: true,
    get() {
      return {
        timing: {
          navigationStart: 1552384918387,
          unloadEventStart: 0,
          unloadEventEnd: 0,
          redirectStart: 0,
          redirectEnd: 0,
          fetchStart: 1552384918393,
          domainLookupStart: 1552384918393,
          domainLookupEnd: 1552384918395,
          connectStart: 1552384918395,
          connectEnd: 1552384918395,
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
        },
        getEntries: () => [
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
        ]
      };
    }
  });

  require("../trackers/timing-api");

  expect(logImage.mock.calls).toEqual([
    [{ type: "performance", name: "timeToFetchStart", value: "6" }],
    [{ type: "performance", name: "dnsLookupTime", value: "2" }],
    [{ type: "performance", name: "timeToFistByte", value: "322" }],
    [{ type: "performance", name: "timeToHtmlPage", value: "337" }],
    [{ type: "performance", name: "domInteractive", value: "446" }],
    [{ type: "performance", name: "pageLoadTime", value: "1309" }],
    [
      {
        type: "assetLoadTime",
        protocol: "h2",
        asset: "https://www.example.com/bundle.css",
        time: "167",
        dns: "100"
      }
    ],
    [
      {
        type: "assetLoadTime",
        protocol: "h2",
        asset: "https://www.example.com/bundle.js",
        time: "167",
        dns: "100"
      }
    ],
    [{ type: "performance", name: "firstPaint", value: "167" }],
    [
      {
        type: "performance",
        name: "firstContentfulPaint",
        value: "235"
      }
    ]
  ]);
});
