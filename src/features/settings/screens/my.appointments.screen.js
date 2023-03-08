import React, { useContext, useEffect, useState } from "react";
import { Text } from "../../../components/typography/text.commponent";
import styled from "styled-components/native";
import { View, FlatList } from "react-native";
import { AuthenticationContext } from "./../../../services/authentication/authentication.context";
import { SchedulerContext } from "./../../../services/schedualer/scheduler.context";

export const AppointmentList = ({ navigation }) => {
  const { getAppointment, appointments, setAppointments } = useContext(
    AuthenticationContext
  );
  const { cancelAppoinment } = useContext(SchedulerContext);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    getAppointment();
  }, [flag]);

  const cancel = async (appointment) => {
    await cancelAppoinment(
      appointment.care,
      appointment.customer,
      appointment.date._seconds,
      appointment.id
    );
    setTimeout(() => {
      //set time out the code went too fast and did not wait for the updated appointment list
      setFlag(!flag);
    }, 1000);
  };

  const renderAppointment = ({ item }) => {
    const time = new Date(item.date._seconds * 1000);
    const title = item.name;
    const type = item.type;
    const status = item.status;
    const cancelled = item.cancelled;
    const approved = item.approved;
    const statusLabel = cancelled
      ? "Cancelled"
      : approved
      ? "Approved"
      : "Pending";
    return (
      <AppointmentItem>
        <AppointmentTitle>{title}</AppointmentTitle>
        <AppointmentType>{type}</AppointmentType>
        <AppointmentTime>{time.toLocaleString()}</AppointmentTime>
        <Status status={status} cancelled={cancelled} approved={approved}>
          {statusLabel}
        </Status>
        <CancelButton onPress={() => cancel(item)} disabled={cancelled}>
          <CancelButtonText>Cancel</CancelButtonText>
        </CancelButton>
      </AppointmentItem>
    );
  };

  return (
    <View>
      {appointments.length === 0 ? (
        <Text>No appointments found</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.date._seconds}
          renderItem={renderAppointment}
        />
      )}
    </View>
  );
};

const AppointmentItem = styled.View`
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  margin-vertical: 8px;
  margin-horizontal: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 3;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap; /* new property */
`;

const AppointmentTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const AppointmentType = styled.Text`
  font-size: 16px;
  margin-vertical: 4px;
`;

const AppointmentTime = styled.Text`
  padding: 4px 10px;
  font-size: 16px;
  color: #555;
`;

const Status = styled.Text`
  font-size: 16px;
  color: #fff;
  background-color: ${(props) => {
    if (props.cancelled) {
      return "#F44336";
    } else if (props.approved) {
      return "#4CAF50";
    } else {
      return "#555";
    }
  }};
  padding: 4px 100px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 4px;
  margin-right: 8px;
  flex-wrap: wrap;
`;
const CancelButton = styled.TouchableOpacity`
  background-color: ${(props) => (props.disabled ? "#CCC" : "#F44336")};
  padding: 8px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  width: 80px;
  flex-wrap: wrap;
`;

const CancelButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
