import React, { useState, useEffect, createContext } from "react";
import { calendarRequest, calendarTransform } from "./schedualer.service";
import { isMock } from "../../utils/env";
import { getApp } from "firebase/app";
import { firebaseConfig } from "../authentication/authentication.service";
import { initializeApp } from "firebase/app";

import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallableFromURL,
  httpsCallable,
  useEmulator,
} from "firebase/functions";
export const SchedulerContext = createContext();

export const SchedulerContextProvider = ({ children }) => {
  const [isActive, setIsActive] = useState("true");
  const [working_hours, setWorking_hours] = useState("0900-1800");
  const [about, setAbout] = useState("san francisco");
  const [placeId, setPlaceId] = useState("2YIhJvmhQbYeK6uajdKa");
  const [interval, setInterval] = useState(60);
  const [month, setMonth] = useState("1-23");
  const [day, setDay] = useState("01");
  const [appointments, setAppointmets] = useState([]);
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const onCalanderChange = (Id) => {
    setPlaceId(Id);
  };

  const schedule = (CustomerID, CareGiverID, TimeStamp, type, setStatus) => {
    const functions = getFunctions(getApp());
    connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    const scheduleAppointment = httpsCallable(functions, "scheduleOperation");
    const request = {
      data: {
        CustomerID: CustomerID,
        CareGiverID: CareGiverID,
        TimeStamp: TimeStamp,
        type: type,
      },
    };
    console.log(type);
    setStatus("check");
    scheduleAppointment(request)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onDateChange = (date, placeId) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    const formattedMonth = `${month}-${year}`;
    const formattedDay = date.getDate().toString().padStart(2, "0");

    setMonth(formattedMonth);
    setDay(formattedDay);
    setPlaceId(placeId);
  };

  useEffect(() => {
    calendarRequest(placeId, month, day, isMock)
      .then(calendarTransform)
      .then(
        ({
          isActive,
          About,
          interval,
          working_hours,
          appointments,
          disabled,
          types,
        }) => {
          setError(null);
          setMarkedDates(disabled);
          setAbout(About);
          setInterval(interval);
          setWorking_hours(working_hours);
          setAppointmets(appointments);
          setIsActive(isActive);
          setTypes(types);
        }
      )
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, [placeId, day]);

  return (
    <SchedulerContext.Provider
      value={{
        isActive,
        working_hours,
        about,
        interval,
        appointments,
        changeID: onCalanderChange,
        changeDate: onDateChange,
        markedDates,
        schedule,
        types,
        placeId,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
};
