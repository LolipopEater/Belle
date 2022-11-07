const { mocks, addmockImage } = require("./mock");
const url = require("url");
const functions = require("firebase-functions");

const addGoogleImage = (restaurant) => {
  const isPhotos = restaurant.photos;
  if (isPhotos === undefined) {
    restaurant.photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ];
    return restaurant;
  } else {
    restaurant.photos = [
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
        restaurant.photos[0].photo_reference
      }&key=${functions.config().google.key}`,
    ];
  }
  return restaurant;
};

module.exports.placesRequest = (request, response, client) => {
  const { location, mock } = url.parse(request.url, true).query;

  if (mock === "true") {
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addmockImage);
    }
    return response.json(data);
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
      res.data.results = res.data.results.map(addmockImage); //changed to addmockImage since api calls costs money suupose to be addGoogleImage
      return response.json(res.data.results);
    })
    .catch((e) => {
      response.status(400);
      return response.send(e.response.data.error_message);
    });
};
