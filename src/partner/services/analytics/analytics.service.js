import React, { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { PartnerSchedulerContext } from "../schedulaer/partner.scheduler.context";
export const goalsChart = (Raw, types, treatmentGoals) => {
  let reformedData = { labels: types, data: [] };
  const countByType = types.reduce((counts, type) => {
    counts[type] = Raw.data.appointments.filter(
      (appointment) => appointment.type === type
    ).length;
    return counts;
  }, {});

  const progress = types.map((goal, index) => {
    // Use the index variable here
    const name = goal;
    if (treatmentGoals[index] === undefined || treatmentGoals[index] === 0) {
      reformedData.labels.splice(index, 1);
      return;
    }
    return countByType[name] / treatmentGoals[index];
  });
  const ProgressFiltered = progress.filter((item) => item !== undefined);
  reformedData.data = ProgressFiltered;
  return reformedData;
};

const getAgeRange = (age) => {
  if (age >= 18 && age <= 25) {
    return "18-25";
  } else if (age >= 26 && age <= 35) {
    return "26-35";
  } else if (age >= 36 && age <= 45) {
    return "36-45";
  } else {
    return "46+";
  }
};

export const ageChart = (customers) => {
  let ageData = [
    {
      name: "18-25",
      population: 0,
      color: "#C70039",
      legendFontColor: "#7F7F7F",
      legendFontSize: 10,
    },
    {
      name: "26-35",
      population: 0,
      color: "#FF5733",
      legendFontColor: "#7F7F7F",
      legendFontSize: 10,
    },
    {
      name: "36-45",
      population: 0,
      color: "#FFC300",
      legendFontColor: "#7F7F7F",
      legendFontSize: 10,
    },
    {
      name: "46+",
      population: 0,
      color: "#DAF7A6",
      legendFontColor: "#7F7F7F",
      legendFontSize: 10,
    },
  ];
  customers.forEach((customer) => {
    const ageRange = getAgeRange(customer.age);

    switch (ageRange) {
      case "18-25":
        ageData[0].population++;
        break;
      case "26-35":
        ageData[1].population++;
        break;
      case "36-45":
        ageData[2].population++;
        break;
      default:
        ageData[3].population++;
        break;
    }
  });

  return ageData;
};
const storeData = async (response, suffix) => {
  try {
    console.log("Storing Analytics Data");
    const jsonValue = JSON.stringify(response);
    await AsyncStorage.setItem(`@rawAnalytics-${suffix}`, jsonValue);
  } catch (e) {
    console.log("error Storing", e);
  }
};

export const DataToCharts = (response, month, types, treatmentGoals) => {
  storeData(response, month);
  const goals = goalsChart(response, types, treatmentGoals);
  return { goals };
};

export const appointmentChart = (Raw, types) => {
  const appointmentData = {
    labels: types,
    datasets: [
      {
        data: [23, 41, 18, 30],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
      },
    ],
  };

  const countByType = types.reduce((counts, type) => {
    counts[type] = Raw.data.appointments.filter(
      (appointment) => appointment.type === type
    ).length;
    return counts;
  }, {});
  const data = types.map((type, index) => {
    const name = type;
    return countByType[name];
  });
  appointmentData.datasets[0].data = data;
  return appointmentData;
};

export const incomeTypeChart = (Raw, types, prices) => {
  const incomeByTypeData = {
    labels: types,
    datasets: [
      {
        data: [2000, 1500, 1800, 1200],
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
      },
    ],
  };

  const countByType = types.reduce((counts, type) => {
    counts[type] = Raw.data.appointments.filter(
      (appointment) => appointment.type === type
    ).length;
    return counts;
  }, {});

  const data = types.map((type, index) => {
    const name = type;
    return countByType[name] * prices[index];
  });
  incomeByTypeData.datasets[0].data = data;
  return incomeByTypeData;
};
