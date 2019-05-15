it("effectiveType is NA if not available", () => {
  const { effectiveType } = require("../trackers/network-type");
  expect(effectiveType).toEqual("NA");
});

it("gets effectiveType from network", () => {
  jest.resetModules();
  Object.defineProperty(window, "navigator", {
    configurable: true,
    get() {
      return {
        connection: {
          effectiveType: "3g"
        }
      };
    }
  });

  const { effectiveType } = require("../trackers/network-type");
  expect(effectiveType).toEqual("3g");
});
