import { logPerformance } from "./log-performance";

// log first input delay that was set up in the head
if ("perfMetrics" in window) {
  window.perfMetrics.onFirstInputDelay((delay: number) => {
    logPerformance("firstInputDelay", Math.round(delay));
  });
}
