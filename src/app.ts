import axios from "axios"; //3rd party library to do HTTP requests
import "reflect-metadata";
import { plainToClass } from "class-transformer";

const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "blablablablabla";
//Custom type to tells typescript the type of the object recived form the API
type GoogleGeocodingResponse = {
  results: { Geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO RESULTS";
};

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
      console.log(coordinates);
    })
    .catch((err: Error) => {
      alert(err.message);
      console.log(err);
    });
});
