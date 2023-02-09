import camelize from "camelize";
import { host, isMock } from "../../utils/env";

export const calendarRequest = (placeId, month, day) => {
  // get the Json information of the current city
  return fetch(
    `${host}/getSchedualer?caregiverId=${placeId}&month=${month}&day=${day}&env=${isMock}`
  ).then((res) => {
    return res.json();
  });
};

export const calendarTransform = (result) => {
  //parse the information and extract information from response
  if (result.hasOwnProperty("error")) {
    return result;
  }
  const formattedResponse = result;
  const isActive = formattedResponse[0].isActive;
  const About = formattedResponse[0].About;
  const interval = formattedResponse[0].interval;
  const working_hours = formattedResponse[0].working_hours;
  const appointments = formattedResponse[1];
  const disabled = getselected(working_hours);

  return { isActive, About, interval, working_hours, appointments, disabled };
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

const getselected = (workingDays) => {
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
