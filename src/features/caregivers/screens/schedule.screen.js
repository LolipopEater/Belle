import React, { useState, useContext, useEffect } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.commponent";
import { ScheduleCalendar } from "../../calendar/calendar.component";
import { ScrollView, View } from "react-native";
import { TimeSlotButtons } from "../../calendar/appointment.component";
import { Back, Submit } from "../../account/components/login.styles";
import { SchedulerContext } from "../../../services/schedualer/scheduler.context";

export const CareGiverScheduleScreen = ({ route, navigation }) => {
  const [selected, setSelected] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(undefined);
  const [timeSelected, setTimeSelected] = useState(undefined);

  const schedulaerInfo = useContext(SchedulerContext); // fetch Data From Context

  const onBack = () => {
    navigation.goBack();
  };

  const { info } = route.params;

  useEffect(() => {
    console.log(schedulaerInfo.working_hours);
    //intitialize Context with current schedular
    schedulaerInfo.changeID(info.placeId);
  }, [route]);

  const onChoose = (day) => {
    //var workingHours= getfunction call a get function to retrive the specific time the caregive works on.
    //const workingHours = working_hours[day.getDay()];

    const start = new Date(day.dateString);

    schedulaerInfo.changeDate(start, info.placeId);

    const workingHours = schedulaerInfo.working_hours[start.getDay()]; //get the working hours of the chosen day to render timeframes

    start.setHours(
      parseInt(workingHours.substring(0, 2)),
      parseInt(workingHours.substring(2, 4)),
      0
    );

    const end = new Date(day.dateString);
    end.setHours(
      parseInt(workingHours.substring(5, 7)),
      parseInt(workingHours.substring(7, 9)),
      0
    );

    setStartTime(start); // current date and time
    setEndTime(end); // end time
  };

  return (
    <SafeArea>
      <ScheduleCalendar
        workingDays={schedulaerInfo.working_hours}
        update={setSelected}
        select={onChoose}
        markedDates={schedulaerInfo.markedDates}
      />
      <ScrollView>
        <Text>{info.placeId}</Text>
        <TimeSlotButtons
          startTime={startTime}
          endTime={endTime}
          interval={60}
          setTimeSelected={setTimeSelected}
          appointments={schedulaerInfo.appointments}
        />
      </ScrollView>
      <Back title="Register" onPress={onBack} icon="keyboard-backspace">
        Back
      </Back>
    </SafeArea>
  );
};
