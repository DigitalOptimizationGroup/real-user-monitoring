const createMockRaf = require("mock-raf");

it("logs changes to FPS", () => {
  const logImage = jest.fn();

  jest.mock("../trackers/gif-logger", () => ({
    logImage
  }));

  var mockRaf = createMockRaf();

  window.requestAnimationFrame = mockRaf.raf;

  Object.defineProperty(window, "performance", {
    configurable: true,
    get() {
      return { now: () => 0 };
    }
  });

  require("../trackers/fps");

  mockRaf.step({ count: 500 });
  mockRaf.step({ count: 100, time: 1000 / 30 });
  mockRaf.step({ count: 100, time: 1000 / 10 });
  mockRaf.step({ count: 500 });

  expect(logImage.mock.calls).toEqual([
    [{ type: "fps", fps: "61", normal: "60", delta: "1017", now: "1017" }],
    [{ type: "fps", fps: "39", normal: "38", delta: "1017", now: "9067" }],
    [{ type: "fps", fps: "30", normal: "30", delta: "1000", now: "10067" }],
    [{ type: "fps", fps: "22", normal: "22", delta: "1000", now: "12067" }],
    [{ type: "fps", fps: "10", normal: "10", delta: "1000", now: "13067" }],
    [{ type: "fps", fps: "35", normal: "35", delta: "1000", now: "22167" }],
    [{ type: "fps", fps: "60", normal: "60", delta: "1000", now: "23167" }]
  ]);
});
