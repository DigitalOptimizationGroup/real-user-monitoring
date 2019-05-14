type EVENT_TYPE = "error" | "performance" | "ping"

export const logImage = (type: EVENT_TYPE, event: {[key: string]: string}, url: string = window.__APP_CONFIG__.gifLoggerUrl): void => {
  const queryString = Object.keys(event)
    .map((key: string): string => {
        return event[key];
      }
    )
    .join("&");
  
  // log our data with an image request
  new Image().src = `${url}/${type}?${queryString}`;
};
