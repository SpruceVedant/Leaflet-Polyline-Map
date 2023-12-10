const axios = require("axios");

const getTolls = (params) => {
  let tolls,
    result = {};
  return new Promise((resolve, reject) => {
    axios
      .post("https://apis.tollguru.com/toll/v2/origin-destination-waypoints", params, {
        headers: {
          "x-api-key": "JfQfQjG8bhjNpMMn6FJ6RFPh4BgJn8nF",
        },
      })
      .then((res) => {
        tolls = res.data["routes"][0]["tolls"];
        result = {
          status: 200,
          result: tolls,
        };
        resolve(result);
      })
      .catch((error) => {
        result = {
          status: 400,
          error,
        };
        reject(err);
      });
  });
};

 export default getTolls({
  from: { lat: 23.184040644854228, lng: 79.90924302714676 },
  to: { lat: 21.217508435562973, lng: 79.08268427095838 },
  vehicleType: "2AxlesTruck",
}).then((res) => console.log(res));