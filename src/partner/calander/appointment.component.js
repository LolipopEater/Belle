import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styled from "styled-components/native";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { PartnerSchedulerContext } from "../services/schedulaer/partner.scheduler.context";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Spacer } from "../../components/spacer/spacer.component";
export const PartnerAppointmentList = ({ navigation }) => {
  const { appointments, stat } = useContext(PartnerSchedulerContext);
  const { cancelAppoinment, confirmAppointment } = useContext(
    PartnerSchedulerContext
  );
  const [flag, setFlag] = useState(false);
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

  const approve = async (appointment) => {
    confirmAppointment(appointment);
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
        <AppointmentType>
          {type} with {item.customerName}
        </AppointmentType>
        <AppointmentType> At {time.toLocaleTimeString()}</AppointmentType>
        {approved === false && cancelled == false ? (
          <ConfirmButton onPress={() => approve(item)}>
            <ButtonText>Confirm!</ButtonText>
          </ConfirmButton>
        ) : (
          <></>
        )}

        <CancelButton onPress={() => cancel(item)} disabled={cancelled}>
          <CancelButtonText>Cancel</CancelButtonText>
        </CancelButton>

        <Status status={status} cancelled={cancelled} approved={approved}>
          {statusLabel}
        </Status>
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
  padding: 10px;
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
  flex-wrap: wrap;
  align-items: flex-end;
  height: 80px;
`;

const AppointmentType = styled.Text`
  font-size: 16px;
  margin-vertical: 4px;
`;

const AppointmentTime = styled.Text`
  font-size: 16px;
  color: #555;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: #4caf50;
  padding: 8px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: ${(props) => (props.disabled ? "#CCC" : "#F44336")};
  padding: 8px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
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

  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 4px;
  margin-right: 8px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const CancelButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
