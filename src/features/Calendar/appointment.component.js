import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../../components/typography/text.commponent";
import { SchedulerContext } from "../../services/schedualer/scheduler.context";
import {
  TimeSlotButton,
  TimeSlotButtonChosen,
  Container,
} from "./appointment.style";

export const TimeSlotButtons = ({ startTime, endTime, setTimeSelected }) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [taken, setTaken] = useState(new Set());
  const { interval, appointments } = useContext(SchedulerContext);
  const onClick = (val) => {
    const timeString = val; // example string in "HH:MM" format
    const [hourString, minuteString] = timeString.split(":"); // split the string into two parts
    const hour = parseInt(hourString, 10); // convert the hour string to a number
    const minute = parseInt(minuteString, 10); // convert the minute string to a number
    const date = new Date(startTime.toDateString()); // create a new Date object with the current date and time
    date.setHours(hour, minute); // set the hours and minutes using the parsed values
    setChosen(val); //set chosen date so color will change
    setTimeSelected(date); //return date to main Schdule Screen for continiuse use.
  };

  const generateTimeSlots = () => {
    //generating Slotsupon avilable appoitnments
    const slots = [];

    const takenSet = new Set(); //using set to search if timestamp exists.

    appointments.forEach((meeting) => {
      let d = new Date(meeting.date._seconds * 1000);
      takenSet.add(d.getTime());
    }); //setting appoitnments per that day

    setTaken(takenSet);

    while (startTime <= endTime) {
      if (takenSet.has(startTime.getTime())) {
      } else {
        slots.push(startTime.toLocaleTimeString().substring(0, 5));
      }

      startTime.setMinutes(startTime.getMinutes() + interval);
    }
    setTimeSlots(slots);
  };

  useEffect(() => {
    generateTimeSlots();
  }, [appointments]); //will be changed , when changing a day a new set of appointments will arrive.

  useEffect(() => {
    generateTimeSlots();
  }, []);

  return (
    <Container>
      {timeSlots.map((time, key) => {
        const Chosen = time === chosen ? TimeSlotButtonChosen : TimeSlotButton;
        return (
          <Chosen key={key} onPress={() => onClick(time)}>
            <Text>{time}</Text>
          </Chosen>
        );
      })}
    </Container>
  );
};
