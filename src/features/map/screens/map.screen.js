import React, { useContext, useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Search } from "../components/search.component";
import styled from "styled-components";
import { LocationContext } from "../../../services/location/location.context";
import { CareGiversContext } from "../../../services/caregivers/caregiver.context";
import { MapCallout } from "../components/map-callout.component";
import { Marker } from "react-native-maps";
import { Callout } from "react-native-maps";
const Map = styled(MapView)`
height:100%
width:100%`;

const Small = styled(MapView)`
height:70%
width:70%`;

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
            <Marker
              key={CareGiver.name}
              title={CareGiver.name}
              coordinate={{
                latitude: CareGiver.geometry.location.lat,
                longitude: CareGiver.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  navigation.navigate("CareGiverDetail", {
                    CareGiver,
                  })
                }
              >
                <MapCallout CareGiver={CareGiver} />
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </>
  );
};

// export const CompactMap = ({ CareGiver }) => {
//   const { location } = useContext(LocationContext);
//   const { CareGivers = [] } = useContext(CareGiversContext);
//   const [latDelta, setLatDelta] = useState(0);
//   const { lat, lng, viewport } = location;

//   useEffect(() => {
//     const northeastLat = viewport.northeast.lat;
//     const southwestLat = viewport.southwest.lat;
//     const latDelta = northeastLat - southwestLat;
//     setLatDelta(latDelta);
//   }, [location, viewport]);

//   return (
//     <>
//       <Small
//         region={{
//           latitude: lat,
//           longitude: lng,
//           latitudeDelta: latDelta,
//           longitudeDelta: 0.02,
//         }}
//       >
//         {CareGivers.map((CareGiver) => {
//           return (
//             <Small.Marker
//               key={CareGiver.name}
//               title={CareGiver.name}
//               coordinate={{
//                 latitude: CareGiver.geometry.location.lat,
//                 longitude: CareGiver.geometry.location.lng,
//               }}
//             >
//               <Small.Callout
//                 onPress={() =>
//                   navigation.navigate("CareGiverDetail", {
//                     CareGiver,
//                   })
//                 }
//               >
//                 <MapCallout CareGiver={CareGiver} />
//               </Small.Callout>
//             </Small.Marker>
//           );
//         })}
//       </Small>
//     </>
//   );
// };
