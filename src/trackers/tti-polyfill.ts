import { logPerformance } from "./log-performance";
const ttiPolyfill = require("tti-polyfill");

const runTti = () => {
  ttiPolyfill.getFirstConsistentlyInteractive({}).then((tti: number) => {
    if (tti > 0) {
      logPerformance("tti", tti);
    }
  });
};

if ("requestIdleCallback" in window) {
  // if browser has requestIdleCallback then let's wait for an idle period to check tti
  window.requestIdleCallback(runTti);
} else {
  runTti();
}
