it("logs a ping event", () => {
  const logImage = jest.fn();

  jest.mock("../trackers/gif-logger", () => ({
    logImage
  }));

  Object.defineProperty(window, "navigator", {
    configurable: true,
    get() {
      return {
        connection: {
          effectiveType: "3g"
        },
        language: "en-US"
      };
    }
  });

  require("../trackers/ping");

  expect(logImage.mock.calls).toEqual([
    [{ type: "ping", language: "en-US", effectiveType: "3g" }]
  ]);
});
