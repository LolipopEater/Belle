const liveHost = "https://us-central1-mealstogo-362f3.cloudfunctions.net";
const localHost =
  "https://009f-77-125-116-78.eu.ngrok.io/mealstogo-362f3/us-central1";

export const isMock = true;
export const host = isMock ? localHost : liveHost;
