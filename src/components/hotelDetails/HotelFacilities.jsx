import WifiIcon from "@mui/icons-material/Wifi";
import Facilities from "components/common/Facilities";
import parkingIcon from "images/parking-icon.svg";

function HotelFacilities(props) {
  return (
    <Facilities>
      <div className="facilities__container">
        {props.hasWifi && (
          <div className="facilities__facility">
            <WifiIcon sx={{ width: 30, height: 30 }} />
            <p className="facilities__facility-text">Wi-Fi</p>
          </div>
        )}
        {props.hasParking && (
          <div className="facilities__facility">
            <img src={parkingIcon} style={{ width: 30, height: 30 }} alt="Parking"></img>
            <p className="facilities__facility-text">Parking</p>
          </div>
        )}
      </div>
    </Facilities>
  );
}

export default HotelFacilities;
