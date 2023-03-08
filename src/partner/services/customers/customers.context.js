import React, { useState, useEffect, createContext, useContext } from "react";
import { isMock } from "../../../utils/env";
import { getApp } from "firebase/app";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallableFromURL,
  httpsCallable,
  useEmulator,
} from "firebase/functions";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
export const CustomersContext = createContext();

export const CustomerContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [customers, setCustomers] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [customersFiltered, setCustomersFiltered] = useState([]);

  const getCustomers = () => {
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }
    const getPartnerCustomer = httpsCallable(functions, "getPartnerCustomer");
    const request = {
      data: {
        id: user.uid,
      },
    };
    getPartnerCustomer(request)
      .then((result) => {
        setCustomers(result.data.data);
        setCustomersFiltered(result.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSearch = (keyword) => {
    if (keyword === "") {
      setCustomersFiltered(customers);
    } else {
      const filtered = customers.filter(
        (customer) =>
          customer.customer.includes(keyword) ||
          customer.Email.includes(keyword)
      );
      setCustomersFiltered(filtered);
    }
  };
  return (
    <CustomersContext.Provider
      value={{
        customers,
        setKeyWord,
        getCustomers,
        customersFiltered,
        onSearch,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
