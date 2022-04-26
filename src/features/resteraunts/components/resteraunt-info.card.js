import React from "react";
import {StyleSheet} from "react-native";
import {Card} from 'react-native-paper';
import styled from 'styled-components/native'

const Title = styled.Text`
  background-color: papayawhip;
`
export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "Some Restaurant",
    icon,
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily,
  } = restaurant;

  return (<Card style={styles.card}>
 
  <Card.Content>
    <Title>{name}</Title>
  </Card.Content>
  <Card.Cover source={{ uri: photos[0] }} style={styles.cover}/>
</Card>);
};

const styles = StyleSheet.create({
    card: { backgroundColor: "white" },
    cover: { padding: 20, backgroundColor: "white" },
    title: { padding: 0 },
  });