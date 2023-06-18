import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import "./HotelLocation.scss";

function HotelLocation(props) {
  return (
    <div className={`hotel-location ${props.className}`}>
      {props.hotelLoaded && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={{
            lat: props.latitude,
            lng: props.longitude,
          }}
          defaultZoom={15}
        >
          <LocationMarker lat={props.latitude} lng={props.longitude} />
        </GoogleMapReact>
      )}
    </div>
  );
}

export default HotelLocation;
