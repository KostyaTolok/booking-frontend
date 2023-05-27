import "./HotelFacilities.scss";
import WifiIcon from "@mui/icons-material/Wifi";
import parkingIcon from "images/parking-icon.svg";

function HotelFacilities(props) {
  return (
    <div className="hotel-facilities">
      <p className="hotel-facilities__title">Facilities</p>
      <div className="hotel-facilities__container">
        {props.hasWifi && (
          <div className="hotel-facilities__facility">
            <WifiIcon sx={{ width: 30, height: 30 }} />
            <p className="hotel-facilities__facility-text">Wi-Fi</p>
          </div>
        )}
        {props.hasParking && (
          <div className="hotel-facilities__facility">
            <img src={parkingIcon} style={{ width: 30, height: 30 }} alt="Parking"></img>
            <p className="hotel-facilities__facility-text">Parking</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HotelFacilities;
