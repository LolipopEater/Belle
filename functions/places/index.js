const { mocks, addmockImage } = require("./mock");
const url = require("url");
const functions = require("firebase-functions");

module.exports.placesRequest = (request, response, client) => {
  const { location, mock } = url.parse(request.url, true).query;

  if (mock === "true") {
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addmockImage);
    }
    response.json(data);
  }
  client
    .placesNearby({
      params: {
        location: location,
        radius: 1500,
        type: "hair_care",
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      res.data.results = res.data.results.map(addmockImage);
      return response.json(res.data.results);
    })
    .catch((e) => {
      response.status(400);
      return response.send(e.response.data.error_message);
    });
};
