const liveHost = "https://us-central1-mealstogo-362f3.cloudfunctions.net";
const localHost =
  "https://878c-77-125-117-19.eu.ngrok.io/mealstogo-362f3/us-central1";

export const isMock = true;
export const host = isMock ? localHost : liveHost;
