import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AppointmentsList } from "../components/appointments.list";
import { Summary } from "../components/summarry.component";
import { Notes } from "../components/Impotant.notes";
import {
  Container,
  AvatarContainer,
  Name,
  DetailsContainer,
  DetailsText,
  ContainerAppointmentsSummary,
  ScheduleButton,
  ScheduleButtonText,
} from "./customer.profile.style";
import { PartnerSchedulerContext } from "../../services/schedulaer/partner.scheduler.context";
import { CustomersContext } from "../../services/customers/customers.context";
export const CustomerProfileScreen = ({ navigation, route }) => {
  const { storeID } = useContext(PartnerSchedulerContext);
  const { setDescription, setChosen } = useContext(CustomersContext);
  const customer = route.params.customer;

  useEffect(() => {
    setChosen(undefined);
    setDescription("Choose an appointment to review Description");
  }, []);

  const handleNav = () => {
    navigation.navigate("Scheduler", {
      customer: customer,
      placeId: storeID,
    });
  };
  return (
    <Container>
      <AvatarContainer>
        <Avatar.Image
          size={80}
          source={{
            uri: "https://this-person-does-not-exist.com/gen/avatar-11849bbf3c0f23ba109dc65f7b58eee8.jpg",
          }}
        />
        <Name>{customer.customer}</Name>
      </AvatarContainer>
      <DetailsContainer>
        <DetailsText>Age: {customer.age}</DetailsText>
        <Spacer position="top" size="large" />
        <DetailsText>Sex: {customer.sex}</DetailsText>
        <DetailsText>Email: {customer.Email}</DetailsText>
        <DetailsText>Phone: {customer.phone}</DetailsText>
      </DetailsContainer>

      <Spacer position="top" size="large" />
      <Text>Appointments:</Text>
      <ContainerAppointmentsSummary>
        <AppointmentsList customer={customer} place={storeID} />
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <Text>Appointment Summary:</Text>
        <Summary />
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <Text>important Notes!:</Text>
        <Notes customer={customer}></Notes>
      </ContainerAppointmentsSummary>

      <ScheduleButton onPress={() => handleNav()}>
        <ScheduleButtonText>Schedule</ScheduleButtonText>
      </ScheduleButton>
    </Container>
  );
};
