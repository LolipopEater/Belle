import { map } from "@firebase/util";
import React, { useState, createContext, useEffect, useContext } from "react";
import { LocationContext } from "../location/location.context";
import {
  CareGiversRequest,
  CareGiversTransform,
  CareGiversFeatured,
} from "./caregiver.service";
import { getApp } from "firebase/app";
import { isMock } from "../../utils/env";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallableFromURL,
  httpsCallable,
  useEmulator,
} from "firebase/functions";
export const CareGiversContext = createContext();

export const CareGiversContextProvider = ({ children }) => {
  const [CareGivers, setCareGivers] = useState([]);
  const [Featured, setFeatured] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [idList, setIdList] = useState("");
  const { location } = useContext(LocationContext);

  const retrieveCareGivers = (formattedlocation) => {
    setIsLoading(true);
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
  };

  const retrieveCareFeatured = () => {
    if (CareGivers.length == 0) {
      return;
    }
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }
    const getFeatured = httpsCallable(functions, "getFeatured");

    getFeatured()
      .then((result) => {
        setIdList(result.data.data.recomended);
      })
      .catch((error) => {
        console.error(error);
      });

    const idSet = new Set();
    idList.split("/").forEach((id) => {
      //splits by id and goin through a foreachlook to add it to a new set.
      if (id.length > 0) {
        idSet.add(id);
      }
    });

    const FeaturedNew = CareGivers.map((careGiver) => {
      if (idSet.has(careGiver.placeId)) {
        return careGiver;
      } else {
        return;
      }
    }).filter((value) => value !== undefined);
    setFeatured(FeaturedNew);
  };

  useEffect(() => {
    if (location) {
      const formattedlocation = `${location.lat},${location.lng}`;
      retrieveCareGivers(formattedlocation);
    }
  }, [location]);

  useEffect(() => {
    setTimeout(() => {
      retrieveCareFeatured();
    }, 1000);
  }, [CareGivers]);

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
