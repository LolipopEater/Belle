import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScheduleCalendar } from "../../features/calendar/calendar.component";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SchedulerContext } from "../../services/schedualer/scheduler.context";
import { PartnerSchedulerContext } from "../services/schedulaer/partner.scheduler.context";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Alert } from "react-native";
import { ScrollView } from "react-native";
import { PartnerAppointmentList } from "../calander/appointment.component";
export const CalanderScreen = ({ route, navigation }) => {
  const [selected, setSelected] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(undefined);
  const [timeSelected, setTimeSelected] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("send");
  const [selectedType, setSelectedType] = useState("Select Type");
  const { user, name } = useContext(AuthenticationContext); //get user setting
  const schedulaerInfo = useContext(PartnerSchedulerContext); // fetch Data From Context
  const onBack = () => {
    navigation.goBack();
  };

  const showError = (errorMessage) => {
    Alert.alert(
      "Error",
      errorMessage,
      [
        {
          text: "OK",
          onPress: () => console.log("OK pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const ScheduleSuccess = (errorMessage) => {
    Alert.alert(
      "Status",
      errorMessage,
      [
        {
          text: "OK",
          onPress: () => onBack(),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const onSchedule = () => {
    if (selectedType === "Select Type") {
      showError("You have not selected type!");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    schedulaerInfo.changeID(user.uid);
  }, [route]);

  const onChoose = (day) => {
    //var workingHours= getfunction call a get function to retrive the specific time the caregive works on.
    //const workingHours = working_hours[day.getDay()];
    const start = new Date(day.dateString);

    schedulaerInfo.changeDate(start, user.uid);

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
      <PartnerAppointmentList />
      <Text>{user.uid}</Text>
    </SafeArea>
  );
};
