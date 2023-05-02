import camelize from "camelize";
import { host, isMock } from "../../../utils/env";
import { getApp } from "firebase/app";

export const calendarTransform = (result) => {
  // transform and return the values from the JSON response
  //parse the information and extract information from response
  if (result.hasOwnProperty("error")) {
    return result;
  }

  const place = result.data.placeID;
  const formattedResponse = result.data.data;
  const prices = formattedResponse[0].prices;
  const goals = formattedResponse[0].goals;
  const name = formattedResponse[0].Name;
  const isActive = formattedResponse[0].isActive;
  const About = formattedResponse[0].About;
  const interval = formattedResponse[0].interval;
  const working_hours = formattedResponse[0].working_hours;
  const appointments = formattedResponse[1];
  const disabled = getselected(working_hours);
  const types = formattedResponse[0].types;
  console.log("Name :: " + name);
  return {
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
    goals,
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

export const reformWorkingHours = (days) => {
  return days.map((day) => {
    if (day.disabled) {
      return "null";
    }

    const startTime = day.startTime.replace(":", "");
    const endTime = day.endTime.replace(":", "");
    return `${startTime}-${endTime}`;
  });
};
export const parseWorkingHours = (workingHours) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const result = [];

  for (let i = 0; i < daysOfWeek.length; i++) {
    const workingHoursString = workingHours[i];
    if (!workingHoursString) {
      result.push({
        name: daysOfWeek[i],
        startTime: "08:00",
        endTime: "18:00",
        disabled: true,
        isDatePickerVisibleStart: false,
        isDatePickerVisibleEnd: false,
      });
      continue;
    }
    const startTime = workingHoursString.slice(0, 4);
    const endTime = workingHoursString.slice(5, 9);
    if (workingHours[i] === "null") {
      result.push({
        name: daysOfWeek[i],
        startTime: `08:00`,
        endTime: `16:00`,
        disabled: true,
        isDatePickerVisibleStart: false,
        isDatePickerVisibleEnd: false,
      });
    } else
      result.push({
        name: daysOfWeek[i],
        startTime: `${startTime.slice(0, 2)}:${startTime.slice(2, 4)}`,
        endTime: `${endTime.slice(0, 2)}:${endTime.slice(2, 4)}`,
        disabled: false,
        isDatePickerVisibleStart: false,
        isDatePickerVisibleEnd: false,
      });
  }

  return result;
};
