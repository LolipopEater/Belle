import camelize from "camelize";
import { host, isMock } from "../../utils/env";

// export const SchedualerRequest = (careGiverID) => {
//   // get the Json information of the current city
//   return fetch(`${host}/geocode?city=${searchTerm}&mock=${isMock}`).then(
//     (res) => {
//       console.log(res);
//       return res.json();
//     }
//   );
// };

// export const schedualerTransform = (result) => {
//   //parse the information and extract information from response
//   const formattedResponse = camelize(result);
//   const { geometry = {} } = formattedResponse.results[0];
//   const { lat, lng } = geometry.location;
//   return { lat, lng, viewport: geometry.viewport };
// };
