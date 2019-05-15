import { Ping } from "../trackers/ping";
import { EventType } from "../trackers/gif-logger";
const globalAny: any = global;

it("properly logs an event by creating a new image and includes requestInfo", () => {
  jest.resetModules();

  Object.defineProperty(window, "__APP_CONFIG__", {
    configurable: true,
    get() {
      return {
        rid: "123",
        vid: "abc",
        startTimestamp: 234234,
        projectId: "my-project",
        gifLoggerUrl: "https://example.com/"
      };
    }
  });

  Object.defineProperty(window, "performance", {
    configurable: true,
    get() {
      return { now: () => 133 };
    }
  });

  globalAny.Image = jest.fn();

  const { logImage } = require("../trackers/gif-logger");

  const event: Ping = {
    type: EventType.Ping,
    language: "en-US",
    effectiveType: "3g"
  };

  logImage(event);

  expect(globalAny.Image.mock.instances[0].src).toBe(
    "https://example.com/?rid=123&vid=abc&startTimestamp=234234&clientTime=133&type=ping&language=en-US&effectiveType=3g"
  );
});
