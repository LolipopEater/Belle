import React, { useState } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.commponent";
import { ScheduleCalendar } from "../../calendar/calendar.component";
import { ScrollView, View } from "react-native";
import { TimeSlotButtons } from "../../calendar/appointment.component";
import { Back, Submit } from "../../account/components/login.styles";

export const CareGiverScheduleScreen = ({ route, navigation }) => {
  const [selected, setSelected] = useState(new Date());
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [interval, setInterval] = useState(60);

  const onBack = () => {
    navigation.goBack();
  };

  const onChoose = (day) => {
    //var workingHours= getfunction call a get function to retrive the specific time the caregive works on.

    const workingHours = ["0900-1800"];

    const start = new Date();
    start.setHours(
      workingHours[0].substring(0, 2),
      workingHours[0].substring(2, 4),
      0
    );

    const end = new Date();
    end.setHours(
      workingHours[0].substring(5, 7),
      workingHours[0].substring(7, 9),
      0
    );

    setStartTime(start); // current date and time
    setEndTime(end); // end time

    setInterval(60); // Interval set to 60 by default
  };

  const { info } = route.params;

  return (
    <SafeArea>
      <ScheduleCalendar
        placeId={info.placeId}
        update={setSelected}
        select={onChoose}
      />
      <ScrollView>
        <Text>{info.placeId}</Text>
        <TimeSlotButtons
          startTime={startTime}
          endTime={endTime}
          interval={interval}
        />
      </ScrollView>
      <Back title="Register" onPress={onBack} icon="keyboard-backspace">
        Back
      </Back>
    </SafeArea>
  );
};
