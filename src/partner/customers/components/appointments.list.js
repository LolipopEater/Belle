import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  AppointmentsContainer,
  AppointmentItem,
  AppointmentText,
} from "./style/appointments.list.style";
import { CustomersContext } from "../../services/customers/customers.context";
import { PartnerSchedulerContext } from "../../services/schedulaer/partner.scheduler.context";
import { FlatList } from "react-native-gesture-handler";

export const AppointmentsList = (customer, place) => {
  const { getProfileData, profile, setDescription, isLoading, setChosen } =
    useContext(CustomersContext);
  const { storeID } = useContext(PartnerSchedulerContext);

  const handleChosen = (appointment) => {
    setChosen(appointment);
    setDescription(appointment.Comment);
  };

  useEffect(() => {
    getProfileData(customer.customer.uid, storeID);
  }, []);

  return (
    <AppointmentsContainer>
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" /> //indicator to if loading.
      ) : (
        <FlatList
          data={profile}
          keyExtractor={(item) => item.id}
          renderItem={({ item: appointment }) => (
            <AppointmentItem
              key={appointment.id}
              onPress={() => {
                handleChosen(appointment);
              }}
            >
              <AppointmentText>
                {`${appointment.date.toLocaleDateString(
                  "en-GB",
                  options
                )} ${appointment.date.toLocaleTimeString("es-MX", options)}`}
                : {appointment.type}
              </AppointmentText>
            </AppointmentItem>
          )}
        />
      )}
    </AppointmentsContainer>
  );
};

const options = {
  // to format time in two digits
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};
