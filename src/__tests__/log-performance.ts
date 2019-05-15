it("properly logs a performance event", () => {
  const logImage = jest.fn();

  jest.mock("../trackers/gif-logger", () => ({
    logImage
  }));

  const { logPerformance } = require("../trackers/log-performance");

  logPerformance("dnsLookupTime", 123);
  expect(logImage.mock.calls).toEqual([
    [{ type: "performance", name: "dnsLookupTime", value: "123" }]
  ]);
});
