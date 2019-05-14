import { sendPerfTiming } from "./log-performance";
const ttiPolyfill = require("tti-polyfill");

// the tti pollyfill
ttiPolyfill.getFirstConsistentlyInteractive({}).then((tti: number) => {
  if (tti > 1) {
    sendPerfTiming("tti", tti);
  }
});
