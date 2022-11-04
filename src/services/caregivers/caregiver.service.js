import camelize from "camelize";
import { host } from "../../utils/env";

export const CareGiversRequest = (location) => {
  return fetch(`${host}/placesNearBy?location=${location}`).then((res) => {
    return res.json();
  });
};

export const CareGiversFeatured = ({ results = [] }) => {
  const mappedResults = results.map((CareGiver) => {
    CareGiver.photos = CareGiver.photos.map((p) => {
      return mockImages[0];
    });

    return {
      ...CareGiver,
      isOpenNow: CareGiver.opening_hours && CareGiver.opening_hours.open_now,
      isClosedTemporarily: CareGiver.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResults);
};

export const CareGiversTransform = (results) => {
  const mappedResults = results.map((CareGiver) => {
    return {
      ...CareGiver,
      isOpenNow: CareGiver.opening_hours && CareGiver.opening_hours.open_now,
      isClosedTemporarily: CareGiver.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResults);
};
