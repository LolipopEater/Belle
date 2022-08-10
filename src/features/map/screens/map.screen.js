import React, { useContext, useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Search } from "../components/search.component";
import styled from "styled-components";
import { LocationContext } from "../../../services/location/location.context";
import { CareGiversContext } from "../../../services/caregivers/caregiver.context";
import { MapCallout } from "../components/map-callout.component";
const Map = styled(MapView)`
height:100%
width:100%`;

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { CareGivers = [] } = useContext(CareGiversContext);
  const [latDelta, setLatDelta] = useState(0);
  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    const latDelta = northeastLat - southwestLat;
    setLatDelta(latDelta);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {CareGivers.map((CareGiver) => {
          return (
            <MapView.Marker
              key={CareGiver.name}
              title={CareGiver.name}
              coordinate={{
                latitude: CareGiver.geometry.location.lat,
                longitude: CareGiver.geometry.location.lng,
              }}
            >
              <MapView.Callout
                onPress={() =>
                  navigation.navigate("CareGiverDetail", {
                    CareGiver,
                  })
                }
              >
                <MapCallout CareGiver={CareGiver} />
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </Map>
    </>
  );
};
