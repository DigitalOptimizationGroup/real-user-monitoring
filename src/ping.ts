import { logImage } from "./image-get-logger";

export type ClientPing = {
  language: string;
};

const event: ClientPing = {
  language: navigator.language,
}

logImage("ping", event);

