import React, { useState, useContext, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import styled from "styled-components";
const CalendarView = styled.View``;

export const ScheduleCalendar = ({
  workingDays,
  update,
  select,
  markedDates,
}) => {
  const [selected, setSelected] = useState(undefined);
  const [today, setToday] = useState(new Date());

  const onSelect = (day) => {
    if (day === today) {
      return;
    }

    const test = new Date(day.dateString);

    setSelected(day.dateString); //set selcted day on this comp
    select(day); //send day selected to father Component
  };

  // useEffect(() => {
  //   getselected(workingDays);
  //   // console.log(selected);
  // }, []);
  // useEffect(() => {
  //   setToday(getCurrentDate());
  //   getselected(workingDays);
  //   // console.log(selected);
  // }, [selected]);

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    // You can turn it in to your desired format
    return (
      year +
      "-" +
      (month <= 9 ? "0" + month : month) +
      "-" +
      (date <= 9 ? "0" + date : date)
    ); //format: y-m-d;
  };
  useEffect(() => {}, []);
  return (
    <>
      <CalendarView>
        <Calendar
          minDate={today} //today's date
          firstDay={0} //do not show last month show 0 days from last month
          theme={{
            textSectionTitleDisabledColor: "#d9e1e8",
          }}
          markedDates={markedDates}
          onDayPress={(day) => onSelect(day)}
        ></Calendar>
      </CalendarView>
    </>
  );
};
