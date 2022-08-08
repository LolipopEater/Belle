import React, { useState, createContext, useEffect, useContext } from "react";
import { LocationContext } from "../location/location.context";
import { CareGiversRequest, CareGiversTransform } from "./caregiver.service";

export const CareGiversContext = createContext();

export const CareGiversContextProvider = ({ children }) => {
  const [CareGivers, setCareGivers] = useState([]);
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
  useEffect(() => {
    if (location) {
      const formattedlocation = `${location.lat},${location.lng}`;
      retrieveCareGivers(formattedlocation);
    }
  }, [location]);
  return (
    <CareGiversContext.Provider
      value={{
        CareGivers,
        isLoading,
        error,
      }}
    >
      {children}
    </CareGiversContext.Provider>
  );
};
