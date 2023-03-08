import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { SearchCustomer } from "../components/customer.searchbar";
import { CustomerList } from "../components/customer.result";
import { CustomersContext } from "../../services/customers/customers.context";
import styled from "styled-components/native";
const SearchCustomerContainer = styled.View`
  flex: 0.1;
`;
const CustomersListContainer = styled.View`
  flex: 1;
`;
export const CustomersList = ({ navigation }) => {
  const { getCustomers } = useContext(CustomersContext);
  const handleCustomerPress = (customer) => {
    navigation.navigate("CustomerProfile", { customer: customer });
  };
  useEffect(() => {
    console.log("First render, fetching customers");
    getCustomers();
  }, []);
  return (
    <SafeArea>
      <SearchCustomerContainer>
        <SearchCustomer />
      </SearchCustomerContainer>
      <CustomersListContainer>
        <CustomerList onPress={handleCustomerPress} />
      </CustomersListContainer>
    </SafeArea>
  );
};
