import camelize from "camelize";
import { host, isMock } from "../../utils/env";

export const CareGiversRequest = (location) => {
  return fetch(`${host}/placesNearBy?location=${location}&mock=${isMock}`).then(
    (res) => {
      console.log(res);
      return res.json();
    }
  );
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
  if (isMock) {
    results = results.results;
  }
  const mappedResults = results.map((CareGiver) => {
    return {
      ...CareGiver,
      isOpenNow: CareGiver.opening_hours && CareGiver.opening_hours.open_now,
      isClosedTemporarily: CareGiver.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResults);
};
