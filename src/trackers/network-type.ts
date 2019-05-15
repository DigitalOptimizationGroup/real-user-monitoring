type ConnectionType = {
  connection: { effectiveType: string };
};

const navigator: ConnectionType = window.navigator as any;

export const effectiveType =
  (navigator.connection && navigator.connection.effectiveType) || "NA";
