import React, { useState, useContext, useEffect } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ScheduleCalendar } from "../../../features/calendar/calendar.component";
import { ScrollView, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TimeSlotButtons } from "../components/slots.compontent";
import { PartnerSchedulerContext } from "../../services/schedulaer/partner.scheduler.context";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  ScheduleButton,
  BackButton,
  ButtonsContainer,
  PickerContainer,
} from "../../../features/caregivers/screens/schedule.style";
import { Text } from "../../../components/typography/text.commponent";
import { LogBox } from "react-native";
import { Alert } from "react-native";
LogBox.ignoreLogs(["RNReactNativeHapticFeedback is not available"]);

export const CareGiverScheduleScreen = ({ route, navigation }) => {
  const [selected, setSelected] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(undefined);
  const [timeSelected, setTimeSelected] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("send");
  const [selectedType, setSelectedType] = useState("Select Type");
  const ID = route.params.placeId;
  const customer = route.params.customer;
  const Auth = useContext(AuthenticationContext); //get user setting

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
    const name = customer.customer;
    if (selectedType === "Select Type") {
      showError("You have not selected type!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      schedulaerInfo.schedule(
        //change
        customer.uid, //change
        timeSelected.getTime(),
        selectedType,
        setStatus,
        ScheduleSuccess,
        name
      );
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    //intitialize Context with current schedular
    schedulaerInfo.changeID(Auth.user.uid);
  }, [route]);

  const onChoose = (day) => {
    //var workingHours= getfunction call a get function to retrive the specific time the caregive works on.
    //const workingHours = working_hours[day.getDay()];

    const start = new Date(day.dateString);
    schedulaerInfo.onScheduleDateChange(start, ID);

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
        <Text>{ID}</Text>
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
          <Picker.Item
            key={"Select Type"}
            label={"Select Type"}
            value={"Select Type"}
          />
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
