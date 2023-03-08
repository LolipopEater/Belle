import React, { useContext, useEffect } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CustomersContext } from "../../services/customers/customers.context";

const CustomerListContainer = styled.View`
  padding-horizontal: 10px;
  padding-vertical: 5px;
  flex: 0.9;
`;

const CustomerItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 20px;
  padding-horizontal: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

const CustomerName = styled.Text``;

const CustomerLastAppointmentDate = styled.Text``;

export const CustomerList = ({ onPress }) => {
  const { customersFiltered } = useContext(CustomersContext);

  const handlePress = (customer) => {
    console.log("Customer pressed:", customer);
    onPress(customer);
  };

  const renderItem = ({ item }) => {
    return (
      <CustomerItemContainer onPress={() => handlePress(item)}>
        <CustomerName>{item.customer}</CustomerName>
        <CustomerLastAppointmentDate>{item.Email}</CustomerLastAppointmentDate>
      </CustomerItemContainer>
    );
  };

  return (
    <CustomerListContainer>
      <FlatList
        data={customersFiltered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </CustomerListContainer>
  );
};
