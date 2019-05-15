it("sets up tti tracking in preparation for the polyfill (tti-polyfill)", () => {
  Object.defineProperty(window, "PerformanceLongTaskTiming", {});

  Object.defineProperty(window, "PerformanceObserver", {
    configurable: true,
    get() {
      return class {
        observe = () => {};
      };
    }
  });

  require("../trackers/init-tti");

  expect(Object.keys((window as any).__tti)).toEqual(["e", "o"]);
});
