it("attaches error handler to window.onerror and logs when called", () => {
  const logImage = jest.fn();

  jest.mock("../trackers/gif-logger", () => ({
    logImage
  }));

  require("../trackers/error-tracking");

  window.onerror &&
    window.onerror("Boom! Error", "source", 342, 2, new Error("Boom!"));

  expect(logImage.mock.calls).toEqual([
    [
      {
        type: "error",
        message: '"Boom! Error"',
        source: "source",
        lineno: "342",
        colno: "2",
        error: "{}"
      }
    ]
  ]);
});
