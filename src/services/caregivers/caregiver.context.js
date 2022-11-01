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

    const feat = CareGivers.filter((CareGiver) => {
      return CareGiver.isfeatured === true;
    });
    console.log(feat);
    setFeatured(feat);
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
