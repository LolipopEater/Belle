import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../../components/typography/text.commponent";

import {
  TimeSlotButton,
  TimeSlotButtonChosen,
  Container,
} from "./appointment.style";

export const TimeSlotButtons = ({
  startTime,
  endTime,
  interval,
  setTimeSelected,
  appointments,
}) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [taken, setTaken] = useState(new Set());

  const onClick = (val) => {
    setChosen(val);
    setTimeSelected(val);
    console.log(taken);
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
  }, [startTime, endTime, interval]); //will be changed , when changing a day a new set of appointments will arrive.

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
