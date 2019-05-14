import { logImage } from "./image-get-logger";

export type ClientPing = {
  rid: string;
  vid: string;
  projectId: string;
  language: string;
  elapsedTime: string;
};

export const ping = () => {
  const event: ClientPing = {
    rid: window.__APP_CONFIG__.rid,
    vid: window.__APP_CONFIG__.vid,
    projectId: window.__APP_CONFIG__.projectId,
    language: navigator.language,
    elapsedTime: window.performance && window.performance.now().toString(),
  }
  logImage("ping", event);
};
