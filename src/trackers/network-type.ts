type ConnectionType = {
  connection: { effectiveType: "slow-2g" | "2g" | "3g" | "4g" };
};

const navigator: ConnectionType = window.navigator as any;

export const effectiveType =
  (navigator.connection && navigator.connection.effectiveType) || "NA";
