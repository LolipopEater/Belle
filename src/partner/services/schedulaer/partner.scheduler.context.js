import React, { useState, useEffect, createContext, useContext } from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { calendarTransform, getselected } from "./partner.scheduler.service";
import { reformWorkingHours } from "./partner.scheduler.service";
import { isMock } from "../../../utils/env";
import { getApp } from "firebase/app";
import { Success } from "../../../components/alert/alert";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallableFromURL,
  httpsCallable,
  useEmulator,
} from "firebase/functions";

export const PartnerSchedulerContext = createContext();

export const PartnerSchedulerContextProvider = ({ children }) => {
  const now = new Date();
  const { user } = useContext(AuthenticationContext);
  const [isActive, setIsActive] = useState("true");
  const [working_hours, setWorking_hours] = useState("0900-1800");
  const [about, setAbout] = useState("san francisco");
  const [placeId, setPlaceId] = useState("gL7h8xKXDacQe7LA5STaEakZXy93");
  const [interval, setInterval] = useState(60);
  const [month, setMonth] = useState("1-23");
  const [day, setDay] = useState("01");
  const [appointments, setAppointmets] = useState([]);
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [dateobj, setDateobj] = useState(now);
  const [responseFlag, setResponseFlag] = useState(false);
  const [storeID, setStore] = useState("");
  const [storeName, setStoreName] = useState("");
  const [prices, setPrices] = useState([]);

  const confirmAppointment = (appointment) => {
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }
    const approveOperation = httpsCallable(functions, "approveOperation");
    const request = {
      data: {
        CustomerID: appointment.customer,
        CareGiverID: appointment.care,
        TimeStamp: appointment.date._seconds,
        id: appointment.id,
      },
    };
    approveOperation(request)
      .then((result) => {
        console.log(result);
        setResponseFlag(!responseFlag);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
    TimeStamp,
    type,
    setStatus,
    ScheduleSuccess,
    name
  ) => {
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }

    const scheduleAppointment = httpsCallable(functions, "scheduleOperation");
    const request = {
      data: {
        CustomerID: CustomerID,
        CareGiverID: storeID,
        TimeStamp: TimeStamp,
        type: type,
        name: name,
      },
    };
    console.log(request);
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
  const onScheduleDateChange = (date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    const formattedMonth = `${month}-${year}`;
    const formattedDay = date.getDate().toString().padStart(2, "0");

    setDateobj(date);
    setMonth(formattedMonth);
    setDay(formattedDay);
  };

  useEffect(() => {
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }
    const partnerCalendarRequest = httpsCallable(
      functions,
      "partnerCalendarRequest"
    );
    const request = {
      data: {
        CareGiverID: placeId,
        month: month,
        day: day,
        isMock: isMock,
      },
    };

    partnerCalendarRequest(request)
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
          place,
          name,
          prices,
        }) => {
          setError(null);
          selectedDay(disabled);
          setAbout(About);
          setInterval(interval);
          setWorking_hours(working_hours);
          setAppointmets(appointments);
          setIsActive(isActive);
          setTypes(types);
          setStore(place);
          setStoreName(name);
          setPrices(prices);
        }
      )
      .catch((err) => {
        setError(err);
        console.log(err + "Tester is this it?");
      });
  }, [responseFlag, day]);

  const selectedDay = (disabled) => {
    if (dateobj) {
      const dateString = dateobj.toISOString().split("T")[0];
      const updatedMarkedDates = {
        ...disabled,
        [dateString]: {
          disableTouchEvent: false,
          selected: false,
          marked: true,
          selectedColor: "#75b2dd",
        },
      };
      setMarkedDates(updatedMarkedDates);
    }
  };
  const updateWorkinghours = (New) => {
    const reformed = reformWorkingHours(New);
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }

    const updateHours = httpsCallable(functions, "updateHours");
    const request = {
      data: {
        new: reformed,
        PlaceID: storeID,
      },
    };
    console.log(request);
    updateHours(request)
      .then((result) => {
        const Messege = "Changed Successfully";
        Success(Messege);
      })
      .catch((error) => {
        console.error(error);
      });
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
        setResponseFlag(!responseFlag);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const updateTypes = (services, Prices) => {
    const functions = getFunctions(getApp());

    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }

    const update = httpsCallable(functions, "updateTypes");
    const request = {
      data: {
        types: services,
        prices: Prices,
        PlaceID: storeID,
      },
    };

    console.log(request);
    update(request)
      .then((result) => {
        const Messege = "Added Service Complete!";
        setTypes(services);
        setPrices(Prices);
        Success(Messege);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <PartnerSchedulerContext.Provider
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
        confirmAppointment,
        storeID,
        onScheduleDateChange,
        updateWorkinghours,
        prices,
        updateTypes,
      }}
    >
      {children}
    </PartnerSchedulerContext.Provider>
  );
};
