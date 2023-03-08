import React, { useState, useEffect, createContext, useContext } from "react";
import {
  calendarRequest,
  calendarTransform,
  getselected,
} from "./schedualer.service";
import { isMock } from "../../utils/env";
import { getApp } from "firebase/app";
import { AuthenticationContext } from "../authentication/authentication.context";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallableFromURL,
  httpsCallable,
  useEmulator,
} from "firebase/functions";
export const SchedulerContext = createContext();

export const SchedulerContextProvider = ({ children }) => {
  const { name } = useContext(AuthenticationContext);
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
  const [dateobj, setDateobj] = useState(new Date());

  const onCalanderChange = (Id) => {
    const month = dateobj.getMonth() + 1;
    const year = dateobj.getFullYear().toString().slice(-2);
    const formattedMonth = `${month}-${year}`;
    const formattedDay = dateobj.getDate().toString().padStart(2, "0");
    setMonth(formattedMonth);
    setDay(formattedDay);
    setPlaceId(placeId);
    setPlaceId(Id);
  };

  const schedule = (
    CustomerID,
    CareGiverID,
    TimeStamp,
    type,
    setStatus,
    ScheduleSuccess
  ) => {
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }
    const scheduleAppointment = httpsCallable(functions, "scheduleOperation");
    const request = {
      data: {
        CustomerID: CustomerID,
        CareGiverID: CareGiverID,
        TimeStamp: TimeStamp,
        type: type,
        name: name,
      },
    };
    console.log(name);
    scheduleAppointment(request)
      .then((result) => {
        const Messege = "Scheduled Successfully";
        ScheduleSuccess(Messege);
        setStatus("check");
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

    setDateobj(date);
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
          selectedDay(disabled);
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

  const selectedDay = (disabled) => {
    if (dateobj) {
      const dateString = dateobj.toISOString().split("T")[0];
      const updatedMarkedDates = {
        ...disabled,
        [dateString]: {
          disableTouchEvent: false,
          selected: true,
          marked: true,
          selectedColor: "#75b2dd",
        },
      };
      setMarkedDates(updatedMarkedDates);
    }
  };
  const cancelAppoinment = (CareGiverID, CustomerID, TimeStamp, id) => {
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }
    const cancelAppointment = httpsCallable(functions, "cancelOperation");

    const request = {
      data: {
        CustomerID: CustomerID,
        CareGiverID: CareGiverID,
        TimeStamp: TimeStamp,
        id: id,
      },
    };
    // console.log(request);
    cancelAppointment(request)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
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
        cancelAppoinment,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
};
