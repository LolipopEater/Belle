import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import {
  Container,
  Title,
  InputContainer,
  InputLabel,
  InputField,
  ServiceContainer,
  ServiceText,
  PriceInputContainer,
  PriceInputLabel,
  PriceInputField,
  ButtonContainer,
} from "./style/types.style";
import { PartnerSchedulerContext } from "../services/schedulaer/partner.scheduler.context";
export const SettingTypesScreen = () => {
  const [services, setServices] = useState(["nails", "laser", "Hair"]);
  const [Prices, setPrices] = useState([50, 30, 25]);
  const [newService, setNewService] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const { types, prices, updateTypes, setResponseFlag } = useContext(
    PartnerSchedulerContext
  );
  const handleAddService = () => {
    if (newService.trim() && newServicePrice.trim()) {
      setServices([...services, newService]);
      setPrices([newServicePrice]);
      setNewService("");
      setNewServicePrice("");
    }
  };

  const handleRemoveService = (service) => {
    const serviceIndex = services.indexOf(service); // get index of the service to be removed
    const updatedServices = [...services]; // create a copy of the services array
    updatedServices.splice(serviceIndex, 1); // remove the service at the given index from the copy of the services array
    const updatedPrices = [...Prices]; // create a copy of the prices array
    updatedPrices.splice(serviceIndex, 1); // remove the price at the given index from the copy of the prices array
    setServices(updatedServices); // update the state of the services array with the updated copy
    setPrices(updatedPrices); // update the state of the prices array with the updated copy
  };

  const handleSubmit = () => {
    updateTypes(services, Prices);
  };

  useEffect(() => {
    setServices(types);
    setPrices(prices);
  }, [types]);

  return (
    <Container>
      <Title>Please Add or Remove a Service</Title>
      {services.map((service, index) => (
        <ServiceContainer key={service}>
          <ServiceText>{service}</ServiceText>
          <PriceInputContainer>
            <PriceInputLabel>Price:</PriceInputLabel>
            <PriceInputField
              value={String(Prices[index])}
              onChangeText={(price) => {
                const updatedPrices = [...Prices];
                updatedPrices[index] = Number(price);
                setPrices(updatedPrices);
              }}
              keyboardType="numeric"
            />
          </PriceInputContainer>
          <Button title="Remove" onPress={() => handleRemoveService(service)} />
        </ServiceContainer>
      ))}
      <InputContainer>
        <InputLabel>Add a new service:</InputLabel>
        <InputField
          value={newService}
          onChangeText={setNewService}
          placeholder="Enter service name"
        />
        <PriceInputContainer>
          <PriceInputLabel>Price:</PriceInputLabel>
          <PriceInputField
            value={newServicePrice}
            onChangeText={setNewServicePrice}
            placeholder="Enter service price"
            keyboardType="numeric"
          />
        </PriceInputContainer>
        <Button title="Add" onPress={handleAddService} />
      </InputContainer>
      <ButtonContainer>
        <Button title="Submit" onPress={handleSubmit} />
      </ButtonContainer>
    </Container>
  );
};
