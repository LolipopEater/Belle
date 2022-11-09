import React, { useState, useContext, useEffect } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import styled from "styled-components";
const CalendarView = styled.View``;

export const ScheduleCalendar = ({ placeId }) => {
  const [selected, setSelected] = useState(undefined);

  const getselected = () => {
    if (selected === undefined) {
      return undefined;
    }
    return { selected: { selected: true } };
  };
  const onSelect = (day) => {
    setSelected(day.dateString);
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <>
      <CalendarView>
        <Calendar
          minDate={"2022-11-08"}
          firstDay={0}
          theme={{
            textSectionTitleDisabledColor: "#d9e1e8",
          }}
          markedDates={{
            "2022-11-15": { disabled: true },
            "2022-11-17": { disabled: true },
            "2022-11-25": { disabled: true },
            ...() => getselected(),
          }}
          onDayPress={(day) => setSelected(day.dateString)}
        ></Calendar>
      </CalendarView>
    </>
  );
};
