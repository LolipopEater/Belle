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
import { Success } from "../../../components/alert/alert";
import { ProfileTransform } from "./customers.service";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
export const CustomersContext = createContext();
export const CustomerContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [customers, setCustomers] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [customersFiltered, setCustomersFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState([]);
  const [description, setDescription] = useState([]);
  const [notes, setNotes] = useState([]);
  const [chosenAppointment, setChosen] = useState(undefined);

  const updateNote = (sum, storeID, customer) => {
    setIsLoading(true);
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }
    const setSumm = httpsCallable(functions, "setNotes");
    const request = {
      data: {
        id: customer.uid,
        PlaceID: storeID,
        summary: sum,
      },
    };

    setSumm(request)
      .then((result) => {
        setNotes(sum);
        setIsLoading(false);
        Success("Updated Succesfully!");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        setError(error);
      });
  };
  const updateSummarry = (sum) => {
    if (chosenAppointment === undefined) {
      Success("Please Choose appointmet!!");
      return;
    }
    setIsLoading(true);
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }
    const setSumm = httpsCallable(functions, "setSummary");
    const request = {
      data: {
        id: chosenAppointment.customer,
        appointmentId: chosenAppointment.id,
        summary: sum,
      },
    };
    setSumm(request)
      .then((result) => {
        setCustomers(result.data.data);
        setCustomersFiltered(result.data.data);
        setIsLoading(false);
        Success("Updated Succesfully!");
        setDescription(sum);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        setError(error);
      });
  };
  const getCustomers = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        setError(error);
      });
  };

  const getProfileData = (UID, place) => {
    setIsLoading(true);
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }
    const getProfile = httpsCallable(functions, "getProfile");
    const request = {
      data: {
        id: UID,
        place: place,
      },
    };

    getProfile(request)
      .then(ProfileTransform)
      .then(({ appointmentsWithDates, Notes }) => {
        setProfile(appointmentsWithDates);
        setNotes(Notes);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        setError(error);
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
  useEffect(() => {
    if (customers.length < 1) {
      getCustomers();
    }
  }, []);
  return (
    <CustomersContext.Provider
      value={{
        customers,
        setKeyWord,
        getCustomers,
        customersFiltered,
        onSearch,
        isLoading,
        getProfileData,
        profile,
        setDescription,
        description,
        updateSummarry,
        chosenAppointment,
        setChosen,
        notes,
        updateNote,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
