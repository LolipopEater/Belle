const liveHost = "https://us-central1-mealstogo-362f3.cloudfunctions.net";
const localHost =
  "https://07ed-77-125-116-254.eu.ngrok.io/mealstogo-362f3/us-central1";

export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = true;
export const host = isDevelopment ? localHost : liveHost;
