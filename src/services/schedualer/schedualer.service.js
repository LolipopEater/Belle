import React, { useState, useEffect } from "react";
// import {} from "./location.service";

export const SchedualerContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [careGiverID, setcareGiverID] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    locationRequest(keyword)
      .then(locationTransform)
      .then((result) => {
        setError(null);
        setIsLoading(false);
        setlocation(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        console.log(err);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        careGiverID,
        workingHours,
        error,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
