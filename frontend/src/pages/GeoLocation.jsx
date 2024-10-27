import React from "react";
import { useGeolocated } from "react-geolocated";

const GeoLocation = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <div className="text-xl">
      <h1>📍 Your Location 📍</h1>
      <h1>
        Latitude: {coords.latitude}, Longitude: {coords.longitude}
      </h1>
    </div>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
};

export default GeoLocation;
