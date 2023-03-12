import "firebase/auth";
import React, { createContext, useState } from "react";
import {
  loginRequest,
  registerRequest,
  logOut,
  auth,
  registerUserInfo,
} from "./authentication.service";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallableFromURL,
  httpsCallable,
  useEmulator,
} from "firebase/functions";
import { isMock } from "../../utils/env";
import { getApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("");
  const [partnerRole, setPartnerRole] = useState(false);

  auth.onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      getChoice();
      console.log(partnerRole + "  On Auth Change Check userRole->" + status);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const storeChoice = async (partner) => {
    try {
      await AsyncStorage.setItem(`@partner`, partner.toString());
    } catch (e) {
      console.log("error Storing", e);
    }
  };

  const getChoice = async () => {
    try {
      const value = await AsyncStorage.getItem(`@partner`);
      if (value !== null) {
        setPartnerRole(JSON.parse(value));
      }
    } catch (e) {
      console.log("error Loading", e);
    }
  };
  const checkUserAccessByEmail = (email) => {
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }
    const requireRole = httpsCallable(functions, "requireRolebyEmail");
    requireRole({ email: email })
      .then((result) => {
        setStatus(result.data.role);
        setName(result.data.name);
      })
      .catch((error) => {
        setStatus(error);
      });
  };

  const getAppointment = () => {
    const uid = user.uid;
    const functions = getFunctions(getApp());
    if (isMock) {
      connectFunctionsEmulator(functions, "192.168.0.146", 5000);
    }
    const getappointments = httpsCallable(functions, "getUserAppointments");

    const request = {
      data: {
        uid: uid,
      },
    };

    getappointments(request)
      .then((result) => {
        let sorted = result.data.appointments.sort(
          (a, b) => a.date._seconds - b.date._seconds
        );
        console.log("test");
        setAppointments(sorted);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onLogin = (email, password, partner) => {
    if (partner) {
      storeChoice(partner);
    }
    checkUserAccessByEmail(email);
    setIsLoading(true);
    setTimeout(() => {
      loginRequest(email, password)
        .then((u) => {
          setUser(u);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          setError(e.toString());
          setPartnerRole(false);
        });
    }, 1000);
  };
  const isValidPhoneNumber = (phoneNumber) => {
    const pattern = /^[0-9]{10}$/; // 10 digits only
    return pattern.test(phoneNumber);
  };
  //try to render main
  const onRegister = (
    email,
    password,
    reapeatedPassword,
    name,
    sex,
    age,
    phone
  ) => {
    setIsLoading(true);
    if (!isValidPhoneNumber(phone)) {
      setIsLoading(false);
      setError("Invalid Phone Number");
      return;
    }
    if (reapeatedPassword !== password) {
      setError("Passwords Do not Match");
      setIsLoading(false);
      return;
    }
    registerRequest(email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        setUser(userCredential.user);
        return registerUserInfo(email, name, sex, age, uid, phone);
      })
      .then((result) => {
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };
  const onLogOut = () => {
    logOut()
      .then(() => {
        setUser(null);
        setError(null);
        setStatus("");
        storeChoice(false);
      })
      .catch((e) => {
        setError(e.toString());
      });
  };
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogOut,
        getAppointment,
        appointments,
        setAppointments,
        status,
        setPartnerRole,
        partnerRole,
        name,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
