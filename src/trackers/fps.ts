import { logImage, EventType } from "./gif-logger";

const MAX_FPS_EVENTS = 10;

var start = performance.now();
var fps = 0;
var priorFps = 0;
var numEvents = 0;

// var slowFrames = []; // frames over 16ms
// var frozenFrames = []; // frames over 700ms

export type Fps = {
  type: EventType.Fps;
  fps: string;
  delta: string;
  clientTime: string;
};

const main = (now: number) => {
  fps++;
  const delta = now - start;
  if (delta >= 1000) {
    const normal = Math.round(fps / (delta / 1000));
    // we don't bother sending if fps >= 50
    if (priorFps !== normal && normal < 50) {
      const event: Fps = {
        type: EventType.Fps,
        fps: normal.toString(),
        delta: Math.round(delta).toString(),
        clientTime: Math.round(now).toString()
      };
      logImage(event);
      numEvents++;
    }
    priorFps = normal;
    fps = 0;
    start = now;
  }
  if (numEvents <= MAX_FPS_EVENTS) {
    requestAnimationFrame(main);
  }
};
requestAnimationFrame(main);
