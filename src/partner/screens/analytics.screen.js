import React, { useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  ProgressChart,
  PieChart,
  BarChart,
  LineChart,
} from "react-native-chart-kit";
import { SafeArea } from "../../components/utility/safe-area.component";
import styled from "styled-components/native";
import {
  Container,
  Title,
  ScrollViewContent,
  ChartContainer,
  ChartBarContainer,
  ChartTitle,
  SubText,
} from "./styles/analytics.style";
import { PartnerSchedulerContext } from "../services/schedulaer/partner.scheduler.context";
import { AnalyticsContext } from "../services/analytics/analytics.context.provider";
import { CustomersContext } from "../services/customers/customers.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AnalyticsScreen = () => {
  const {
    fetchData,
    Sort,
    progressData,
    ageData,
    appointmentData,
    incomeByTypeData,
    isLoading,
    setIsLoading,
  } = useContext(AnalyticsContext);
  const handleRefresh = async () => {
    await fetchData();
    console.log("REFRESH ANALYTICS");
  };
  const { customers, getCustomers } = useContext(CustomersContext);

  const BarchartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#000000",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    yAxisInterval: 1,
  };
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#e26a00",
    backgroundGradientTo: "#e26a00",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barRadius: 50,
  };

  const incomeData = {
    labels: ["5 Mar", "10 Mar", "15 Mar", "20 Mar", "25 Mar"],
    datasets: [
      {
        data: [800, 1200, 1000, 1600, 2000],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
  const TitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  `;
  return (
    <SafeArea>
      <Container>
        <TitleContainer>
          <Title>
            <TouchableOpacity onPress={handleRefresh}>
              <Icon name="refresh" size={20} color="#333" />
            </TouchableOpacity>
            Analytics
          </Title>
        </TitleContainer>

        <ScrollViewContent>
          <SubText>Goal Progress this month:</SubText>
          <ChartContainer>
            <ProgressChart
              data={progressData}
              width={Dimensions.get("window").width}
              height={250}
              strokeWidth={10}
              radius={35}
              chartConfig={chartConfig}
              hideLegend={false}
              center={[0, 50]}
            />
          </ChartContainer>
          <SubText>Customers By Age :</SubText>
          <ChartContainer>
            <PieChart
              data={ageData}
              width={Dimensions.get("window").width}
              height={220}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"#b9b5b5"}
              paddingLeft={"15"}
              center={[25, 5]}
              absolute
            />
          </ChartContainer>
          <SubText>How Many Appointments by Type this month:</SubText>
          <ChartBarContainer>
            <BarChart
              data={appointmentData}
              width={Dimensions.get("window").width}
              height={220}
              yAxisLabel=""
              chartConfig={BarchartConfig}
              verticalLabelRotation={0}
            />
          </ChartBarContainer>
          <SubText>How Much income by Type this month:</SubText>
          <ChartBarContainer>
            <BarChart
              data={incomeByTypeData}
              width={Dimensions.get("window").width}
              height={220}
              yAxisLabel=""
              chartConfig={BarchartConfig}
              verticalLabelRotation={0}
            />
          </ChartBarContainer>
        </ScrollViewContent>
      </Container>
    </SafeArea>
  );
};
