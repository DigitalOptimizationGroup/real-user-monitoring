it("logs tii event from tti-polyfill with requestIdleCallback", done => {
  jest.mock("tti-polyfill", () => ({
    getFirstConsistentlyInteractive: () => {
      return Promise.resolve(1200);
    }
  }));

  const logImage = jest.fn();

  jest.mock("../trackers/gif-logger", () => ({
    logImage
  }));

  window.requestIdleCallback = (callback: Function) => callback();

  require("../trackers/tti-polyfill");

  // tti-polyfill logs in a Promise
  setTimeout(() => {
    expect(logImage.mock.calls).toEqual([
      [{ type: "performance", name: "tti", value: "1200" }]
    ]);
    done();
  }, 0);
});

it("logs tii event from tti-polyfill", done => {
  jest.resetModules();
  const logImage = jest.fn();

  jest.mock("../trackers/gif-logger", () => ({
    logImage
  }));

  jest.mock("tti-polyfill", () => ({
    getFirstConsistentlyInteractive: () => {
      return Promise.resolve(1200);
    }
  }));

  delete window.requestIdleCallback;

  require("../trackers/tti-polyfill");

  setTimeout(() => {
    expect(logImage.mock.calls).toEqual([
      [{ type: "performance", name: "tti", value: "1200" }]
    ]);
    done();
  }, 0);
});
