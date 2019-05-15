import { logImage, EventType } from "./gif-logger";
import { effectiveType } from "./network-type";

export type Ping = {
  type: EventType.Ping;
  language: string;
  effectiveType: string;
};

const event: Ping = {
  type: EventType.Ping,
  language: navigator.language,
  effectiveType
};

logImage(event);
