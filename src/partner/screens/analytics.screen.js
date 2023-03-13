import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
export const AnalyticsScreen = () => {
  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [1, 2, 3, 4, 5, 6],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={250}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#1E2923",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(128, 39, 206, 1, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
