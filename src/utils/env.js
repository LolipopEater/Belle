const liveHost = "https://us-central1-mealstogo-362f3.cloudfunctions.net";
const localHost =
  "https://a351-77-125-117-20.ngrok-free.app/mealstogo-362f3/us-central1";

export const isMock = false;
export const host = isMock ? localHost : liveHost;
