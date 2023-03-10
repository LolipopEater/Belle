import { Alert } from "react-native";

export const Success = (errorMessage) => {
  Alert.alert(
    "Status",
    errorMessage,
    [
      {
        text: "OK",
        style: "cancel",
      },
    ],
    { cancelable: false }
  );
};
