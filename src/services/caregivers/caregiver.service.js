import { mocks, mockImages } from "./mock";
import camelize from "camelize";

export const CareGiversRequest = (location) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    } else {
      resolve(mock);
    }
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

export const CareGiversTransform = ({ results = [] }) => {
  const mappedResults = results.map((CareGiver) => {
    CareGiver.photos = CareGiver.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });

    return {
      ...CareGiver,
      isOpenNow: CareGiver.opening_hours && CareGiver.opening_hours.open_now,
      isClosedTemporarily: CareGiver.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResults);
};
