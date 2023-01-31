import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../../components/typography/text.commponent";

import {
  TimeSlotButton,
  TimeSlotButtonChosen,
  Container,
} from "./appointment.style";

export const TimeSlotButtons = ({ startTime, endTime, interval }) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [chosen, setChosen] = useState(null);

  const onClick = (val) => {
    setChosen(val);
  };

  useEffect(() => {
    const generateTimeSlots = () => {
      const slots = [];

      while (startTime <= endTime) {
        slots.push(startTime.toLocaleTimeString().substring(0, 5));
        startTime.setMinutes(startTime.getMinutes() + interval);
      }

      setTimeSlots(slots);
    };

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
