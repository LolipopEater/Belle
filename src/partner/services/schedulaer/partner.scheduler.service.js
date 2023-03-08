import camelize from "camelize";
import { host, isMock } from "../../../utils/env";
import { getApp } from "firebase/app";

export const calendarTransform = (result) => {
  // transform and return the values from the JSON response
  //parse the information and extract information from response
  if (result.hasOwnProperty("error")) {
    return result;
  }

  const formattedResponse = result.data.data;
  const isActive = formattedResponse[0].isActive;
  const About = formattedResponse[0].About;
  const interval = formattedResponse[0].interval;
  const working_hours = formattedResponse[0].working_hours;
  const appointments = formattedResponse[1];
  const disabled = getselected(working_hours);
  const types = formattedResponse[0].types;
  return {
    isActive,
    About,
    interval,
    working_hours,
    appointments,
    disabled,
    types,
  };
};

const grayedOutStyle = {
  //style config for the grayed out days.
  disableTouchEvent: true,
  selected: true,
  marked: false,
  selectedColor: "#d9e1e8",
};
const SelectedStyle = {
  disableTouchEvent: false,
  selected: true,
  marked: true,
  selectedColor: "blue",
};

export const getselected = (workingDays, date) => {
  //grayout days which are NULL(out of business that day example would be saturday)
  let markedDates = {};
  for (let i = 0; i <= workingDays.length; i++) {
    if (workingDays[i] === "null") {
      for (let j = 1; j <= 365; j++) {
        const date = new Date(2023, 0, j);
        const dayOfWeek = date.getUTCDay();

        if (dayOfWeek === i) {
          markedDates[date.toISOString().split("T")[0]] = grayedOutStyle; //push it as value in format of day:style
        }
      }
    }
  }
  return markedDates;
};
