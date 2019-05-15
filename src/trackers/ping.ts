import { logImage } from "./gif-logger";
import { effectiveType } from "./network-type";

export type ClientPing = {
  language: string;
  effectiveType: string;
};

const event: ClientPing = {
  language: navigator.language,
  effectiveType
};

logImage("ping", event);
