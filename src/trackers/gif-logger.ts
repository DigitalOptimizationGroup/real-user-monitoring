export const enum EventType {
  ErrorLog = "errorLog",
  PerformanceTiming = "performanceTiming",
  Ping = "ping",
  AssetTiming = "assetTiming",
  Fps = "fps"
}

export type BasePerfEvent = {
  [key: string]: string;
  type: EventType;
};

export type RequestInfo = {
  rid: string;
  vid: string;
  startTimestamp: string;
  elapsedTime: string;
  projectId: string;
};

export type AppConfig = {
  rid: string;
  vid: string;
  startTimestamp: number;
  projectId: string;
  gifLoggerUrl: string;
};

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};

declare global {
  interface Window {
    __APP_CONFIG__: AppConfig;
    perfMetrics: { onFirstInputDelay: Function };
    encodeURIComponent: Function;
    requestIdleCallback: ((
      callback: ((deadline: RequestIdleCallbackDeadline) => void),
      opts?: RequestIdleCallbackOptions
    ) => RequestIdleCallbackHandle);
    cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
  }
}

type FullEvent = BasePerfEvent & RequestInfo;

export const logImage = (
  event: BasePerfEvent,
  url: string = window.__APP_CONFIG__.gifLoggerUrl
): void => {
  const requestInfo: RequestInfo = {
    rid: window.__APP_CONFIG__.rid,
    vid: window.__APP_CONFIG__.vid,
    startTimestamp: window.__APP_CONFIG__.startTimestamp.toString(),
    projectId: window.__APP_CONFIG__.projectId,
    elapsedTime: Math.round(
      (window.performance && window.performance.now()) || Date.now()
    ).toString()
  };

  const fullEvent: FullEvent = { ...requestInfo, ...event };

  const log = () => {
    const queryString = Object.keys(fullEvent)
      .map(
        (key: string): string => {
          return `${key}=${window.encodeURIComponent(fullEvent[key])}`;
        }
      )
      .join("&");

    // log our data with an image request
    new Image().src = `${url}?${queryString}`;
  };

  if ("requestIdleCallback" in window) {
    // if browser has requestIdleCallback then let's wait for an idle period to log
    window.requestIdleCallback(log);
  } else {
    log();
  }
};
