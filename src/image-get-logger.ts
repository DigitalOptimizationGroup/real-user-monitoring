type EVENT_TYPE = "error" | "performance" | "ping" | "asset-load-times"

export type RequestInfo = {
  rid: string;
  vid: string;
  startTimestamp: string;
  clientTime: string;
};

const requestInfo: RequestInfo = {
  rid: window.__APP_CONFIG__.rid,
  vid: window.__APP_CONFIG__.vid,
  startTimestamp: window.__APP_CONFIG__.startTimestamp.toString(),
  clientTime: window.performance && window.performance.now().toString()
}

export const logImage = (type: EVENT_TYPE, event: {[key: string]: string}, url: string = window.__APP_CONFIG__.gifLoggerUrl): void => {
  const queryString = Object.keys({...requestInfo, ...event})
    .map((key: string): string => {
        return event[key];
      }
    )
    .join("&");
  
  // log our data with an image request
  new Image().src = `${url}/${type}?${queryString}`;
};
