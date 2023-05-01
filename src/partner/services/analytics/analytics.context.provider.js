import React, { useState, useEffect, createContext, useContext } from "react";
import { isMock } from "../../../utils/env";
import { getApp } from "firebase/app";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallableFromURL,
  httpsCallable,
  useEmulator,
} from "firebase/functions";
import { Success } from "../../../components/alert/alert";
import { PartnerSchedulerContext } from "../schedulaer/partner.scheduler.context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  DataToCharts,
  goalsChart,
  ageChart,
  appointmentChart,
  incomeTypeChart,
} from "./analytics.service";
import { CustomersContext } from "../customers/customers.context";
export const AnalyticsContext = createContext();

export const AnalyticsContextProvider = ({ children }) => {
  const { types, storeID, month, treatmentGoals, prices } = useContext(
    PartnerSchedulerContext
  );
  const { customers } = useContext(CustomersContext);
  const [incomeByTypeData, setIncomeByTypeData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }
    const fetchAnalyticsData = httpsCallable(functions, "fetchAnalyticsData");

    const request = {
      data: {
        PlaceID: storeID,
        month: month,
      },
    };
    fetchAnalyticsData(request)
      .then((result) => {
        DataToCharts(result, month, types, treatmentGoals);
        Sort(result);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const Sort = (data) => {
    // console.log(data);
    const reformedGoals = goalsChart(data, types, treatmentGoals);
    setProgressData(reformedGoals);
    const agedat = ageChart(customers);
    setAgeData(agedat);
    const appointmentscount = appointmentChart(data, types);
    setAppointmentData(appointmentscount);
    const incomeType = incomeTypeChart(data, types, prices);
    setIncomeByTypeData(incomeType);
  };
  useEffect(() => {
    // console.log(incomeByTypeData);
    const getAppointments = async () => {
      // Retrieve appointments data from AsyncStorage
      setIsLoading(true);
      try {
        const appointmentsJson = await AsyncStorage.getItem(
          `@rawAnalytics-${month}`
        );
        if (appointmentsJson !== null) {
          // Appointments data exists
          const appointmentsData = JSON.parse(appointmentsJson);
          Sort(appointmentsData);
          setIsLoading(false);
        } else {
          // Appointments data does not exist
          console.log("No appointments found in AsyncStorage");
          fetchData();
        }
      } catch (error) {
        console.log(
          "Error retrieving appointments from AsyncStorage:",
          error.message
        );
      }
    };
    getAppointments();
  }, [treatmentGoals]);

  return (
    <AnalyticsContext.Provider
      value={{
        incomeByTypeData,
        appointmentData,
        ageData,
        progressData,
        fetchData,
        Sort,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
