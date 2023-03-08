import React from "react";
import { CompactCareGiverInfo } from "../../../components/caregiver/compact-caregiver-info";

export const MapCallout = ({ CareGiver }) => {
  return (
    <CompactCareGiverInfo
      CareGiver={CareGiver}
      isMap={true}
      isRecommended={false}
    />
  );
};
