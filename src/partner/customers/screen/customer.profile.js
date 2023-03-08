import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

export const CustomerProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is Chat Screen.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
