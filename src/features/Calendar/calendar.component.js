import React, { useState, useContext, useEffect } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import styled from "styled-components";
const CalendarView = styled.View``;

export const ScheduleCalendar = ({ placeId, update, select }) => {
  const [selected, setSelected] = useState(undefined);
  const [today, setToday] = useState("");
  const [show, setShow] = useState(false);
  const [timeSelected, setTimeSelected] = useState(undefined);

  const getselected = () => {
    if (selected === undefined) {
      return undefined;
    }
    return { selected: { selected: true } };
  };

  const dateString = "January 31, 2023 at 11:00:00 AM UTC+2";
  const date = new Date(dateString);
  const onSelect = (day) => {
    if (day === today) {
      return;
    }

    setSelected(day.dateString);
    setShow(!show);
    select(date);
    // console.log(
    //   selected +
    //     "  " +
    //     placeId +
    //     "  Today is =  " +
    //     getCurrentDate() +
    //     " isShow? = " +
    //     show +
    //     "   date:  " +
    //     date.getDay()
    // );
  };

  useEffect(() => {
    setToday(getCurrentDate());
  }, [selected]);

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

  return (
    <>
      <CalendarView>
        <Calendar
          minDate={today} //today's date
          firstDay={0} //do not show last month show 0 days from last month
          theme={{
            textSectionTitleDisabledColor: "#d9e1e8",
          }}
          markedDates={{}}
          onDayPress={(day) => onSelect(day)}
        ></Calendar>
      </CalendarView>
    </>
  );
};
