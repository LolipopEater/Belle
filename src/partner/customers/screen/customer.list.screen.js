import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { SearchCustomer } from "../components/customer.searchbar";
import { CustomerList } from "../components/customer.result";
import { CustomersContext } from "../../services/customers/customers.context";
import styled from "styled-components/native";
const SearchCustomerContainer = styled.View`
  flex: 0.1;
`;
const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
const CustomersListContainer = styled.View`
  flex: 1;
`;
export const CustomersList = ({ navigation }) => {
  const { getCustomers, isLoading } = useContext(CustomersContext);

  const handleCustomerPress = (customer) => {
    //transfers the screen to the Customer Profile Screen
    navigation.navigate("CustomerProfile", { customer: customer });
  };

  useEffect(() => {
    //fetch data on first render
    console.log("First render, fetching customers");
    getCustomers();
  }, []);

  return (
    <SafeArea>
      <SearchCustomerContainer>
        <SearchCustomer />
      </SearchCustomerContainer>

      <CustomersListContainer>
        {isLoading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color="#0000ff" />
          </LoadingContainer>
        ) : (
          <CustomerList onPress={handleCustomerPress} />
        )}
      </CustomersListContainer>
    </SafeArea>
  );
};
