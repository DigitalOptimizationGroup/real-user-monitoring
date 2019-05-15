import { logImage } from "./gif-logger";

var start = performance.now();
var fps = 0;
var priorFps = 0;
var numEvents = 0;
var MAX_FPS_EVENTS = 10;

// var slowFrames = []; // frames over 16ms
// var frozenFrames = []; // frames over 700ms

export type FPS = {
  fps: string;
  normal: string;
  delta: string;
  now: string;
};

const main = (now: number) => {
  fps++;
  const delta = now - start;
  if (delta >= 1000) {
    const normal = Math.round(fps / (delta / 1000));
    if (priorFps !== normal) {
      const event = {
        fps: fps.toString(),
        normal: normal.toString(),
        delta: delta.toString(),
        now: now.toString()
      };
      logImage("fps", event);
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
