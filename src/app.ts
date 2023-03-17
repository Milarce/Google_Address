import axios from "axios"; //3rd party library to do HTTP requests

const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "blablablablabla";
//Custom type to tells typescript the type of the object recived form the API
type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO RESULTS";
};

declare var google: any;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault;
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${enteredAddress}&key=${GOOGLE_API_KEY}` //Google's API for get coords from an address
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Address not found!");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coordinates,
          zoom: 8,
        }
      );

      new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    })
    .catch((err: Error) => {
      alert(err.message);
      console.log(err);
    });
});
