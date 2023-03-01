const functions = require("firebase-functions");
const { geocodeRequests } = require("./geocode");
const { placesRequest } = require("./places");
const { getSchedualer } = require("./schedualer");
const { Client } = require("@googlemaps/google-maps-services-js");
const scheduleOperation = require("./appointment").scheduleOperation;

const client = new Client({});

exports.getSchedualer = functions.https.onRequest((request, response) => {
  getSchedualer(request, response, client);
});
exports.geocode = functions.https.onRequest((request, response) => {
  geocodeRequests(request, response, client);
});

exports.placesNearBy = functions.https.onRequest((request, response) => {
  placesRequest(request, response, client);
});

exports.scheduleOperation = scheduleOperation;
