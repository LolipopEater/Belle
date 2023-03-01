import React, { useState, useContext, useEffect } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ScheduleCalendar } from "../../calendar/calendar.component";
import { ScrollView, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TimeSlotButtons } from "../../calendar/appointment.component";
import { SchedulerContext } from "../../../services/schedualer/scheduler.context";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  ScheduleButton,
  BackButton,
  ButtonsContainer,
  PickerContainer,
} from "./schedule.style.js";
import { Text } from "../../../components/typography/text.commponent";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["RNReactNativeHapticFeedback is not available"]);
export const CareGiverScheduleScreen = ({ route, navigation }) => {
  const [selected, setSelected] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(undefined);
  const [timeSelected, setTimeSelected] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("send");
  const [selectedType, setSelectedType] = useState(null);

  const Auth = useContext(AuthenticationContext); //get user setting
  const schedulaerInfo = useContext(SchedulerContext); // fetch Data From Context
  const onBack = () => {
    navigation.goBack();
  };

  const onSchedule = () => {
    setLoading(true);
    setTimeout(() => {
      schedulaerInfo.schedule(
        Auth.user.uid,
        info.placeId,
        timeSelected.getTime(),
        selectedType,
        setStatus
      );
      setLoading(false);
    }, 4000);
  };
  const { info } = route.params;

  useEffect(() => {
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
      <PickerContainer>
        <Text>Please Pick Service Type</Text>
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedType(itemValue);
          }}
          enableHapticFeedback={true}
        >
          {schedulaerInfo.types.map((type) => (
            <Picker.Item key={type.id + 1} label={type} value={type} />
          ))}
        </Picker>
      </PickerContainer>
      <ButtonsContainer>
        <BackButton onClick={onBack} />
        {timeSelected && (
          <ScheduleButton
            loading={loading}
            onClick={onSchedule}
            status={status}
          />
        )}
      </ButtonsContainer>
    </SafeArea>
  );
};
