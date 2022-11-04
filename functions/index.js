const functions = require("firebase-functions");
const { geocodeRequests } = require("./geocode");
const { placesRequest } = require("./places");
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

exports.geocode = functions.https.onRequest((request, response) => {
  geocodeRequests(request, response, client);
});

exports.placesNearBy = functions.https.onRequest((request, response) => {
  placesRequest(request, response, client);
});
