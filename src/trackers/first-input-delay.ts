import { sendPerfTiming } from "./log-performance";

// log first input delay that was set up in the head
window.perfMetrics.onFirstInputDelay((delay: number) => {
  sendPerfTiming("firstInputDelay", Math.round(delay));
});
