const functions = require("firebase-functions");
const { geocodeRequests } = require("./geocode");
const { placesRequest } = require("./places");
const { getSchedualer } = require("./schedualer");
const { Client } = require("@googlemaps/google-maps-services-js");
const getAppointment = require("./user").getUserAppointments;
const scheduleOperation = require("./appointment").scheduleOperation;
const cancelOperation = require("./appointment").cancelOperation;
const register = require("./register").register;
const getFeatured = require("./util").getFeatured;
const requireRole = require("./util").requireRole;
const partnerCalendarRequest = require("./schedualer").partnerCalendarRequest;
const requireRolebyEmail = require("./util").requireRoleByEmail;
const approveOperation = require("./appointment").approveOperation;
const getPartnerCustomer = require("./caregiver").getPartnerCustomer;
const getProfile = require("./caregiver").getProfile;
const setSummary = require("./caregiver").setSummary;
const client = new Client({});
const setNotes = require("./caregiver").setNotes;
const updateHours = require("./caregiver").updateHours;
const updateTypes = require("./caregiver").updateTypes;
const updateGoals = require("./caregiver").updateGoals;
const fetchAnalyticsData = require("./caregiver").fetchAnalyticsData;

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
exports.register = register;
exports.getUserAppointments = getAppointment;
exports.cancelOperation = cancelOperation;
exports.getFeatured = getFeatured;
exports.requireRole = requireRole;
exports.requireRolebyEmail = requireRolebyEmail;
exports.partnerCalendarRequest = partnerCalendarRequest;
exports.approveOperation = approveOperation;
exports.getPartnerCustomer = getPartnerCustomer;
exports.getProfile = getProfile;
exports.setSummary = setSummary;
exports.setNotes = setNotes;
exports.updateHours = updateHours;
exports.updateTypes = updateTypes;
exports.updateGoals = updateGoals;
exports.fetchAnalyticsData = fetchAnalyticsData;
