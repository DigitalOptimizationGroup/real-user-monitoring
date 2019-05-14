import { logImage } from "./gif-logger";

export type ClientPing = {
  language: string;
};

const event: ClientPing = {
  language: navigator.language
};

logImage("ping", event);
