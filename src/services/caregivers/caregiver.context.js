import { map } from "@firebase/util";
import React, { useState, createContext, useEffect, useContext } from "react";
import { LocationContext } from "../location/location.context";
import {
  CareGiversRequest,
  CareGiversTransform,
  CareGiversFeatured,
} from "./caregiver.service";

export const CareGiversContext = createContext();

export const CareGiversContextProvider = ({ children }) => {
  const [CareGivers, setCareGivers] = useState([]);
  const [Featured, setFeatured] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveCareGivers = (formattedlocation) => {
    setIsLoading(true);
    setCareGivers([]);
    setTimeout(() => {
      CareGiversRequest(formattedlocation)
        .then(CareGiversTransform)
        .then((results) => {
          setIsLoading(false);
          setCareGivers(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 750);
  };
  const retrieveCareFeatured = () => {
    if (CareGivers.length == 0) {
      return;
    }

    CareGivers.map((CareGiver) => {
      if (CareGiver.isfeatured)
        return {
          ...CareGiver,
          isOpenNow:
            CareGiver.opening_hours && CareGiver.opening_hours.open_now,
          isClosedTemporarily:
            CareGiver.business_status === "CLOSED_TEMPORARILY",
        };
      return;
    });
  };
  useEffect(() => {
    if (location) {
      const formattedlocation = `${location.lat},${location.lng}`;
      retrieveCareGivers(formattedlocation);
      retrieveCareFeatured(formattedlocation);
    }
  }, [location]);
  return (
    <CareGiversContext.Provider
      value={{
        CareGivers,
        isLoading,
        Featured,
        error,
      }}
    >
      {children}
    </CareGiversContext.Provider>
  );
};
