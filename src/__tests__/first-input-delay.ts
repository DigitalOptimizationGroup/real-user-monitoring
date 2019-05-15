it("calls window.perfMetrics.onFirstInputDelay and logs the callback value", () => {
  const logImage = jest.fn();

  jest.mock("../trackers/gif-logger", () => ({
    logImage
  }));

  window.perfMetrics = {
    onFirstInputDelay: (callback: Function) => {
      callback(342);
    }
  };

  require("../trackers/first-input-delay");

  expect(logImage.mock.calls).toEqual([
    [
      {
        name: "firstInputDelay",
        type: "performance",
        value: "342"
      }
    ]
  ]);
});
