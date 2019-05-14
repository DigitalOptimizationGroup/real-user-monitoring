import { logImage } from "./gif-logger";

export const sendPerfTiming = (t: string, v: number) => {
  logImage("performance", {
    t,
    value: Math.round(v).toString()
  });
};
