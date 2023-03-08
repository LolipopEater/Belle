import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { CustomersContext } from "../../services/customers/customers.context";
const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  flex: 1;
`;

export const SearchCustomer = ({}) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { customers, getCustomers, onSearch } = useContext(CustomersContext);

  const onsubmit = () => {
    getCustomers();
    console.log(customers);
  };

  return (
    <SearchContainer>
      <Searchbar
        // icon={isFavouritesToggled ? "heart" : "heart-outline"}
        placeholder="search for a customer"
        onSubmitEditing={() => {
          onsubmit();
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
          onSearch(text);
        }}
        value={searchKeyword}
      />
    </SearchContainer>
  );
};
