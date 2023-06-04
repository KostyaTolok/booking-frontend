import { KitchenOutlined, LocalLaundryServiceOutlined } from "@mui/icons-material";
import Facilities from "components/common/Facilities";

function RoomFacilities(props) {
  return (
    <Facilities>
      <div className="facilities__container">
        {props.hasWashingMachine && (
          <div className="facilities__facility">
            <LocalLaundryServiceOutlined sx={{ width: 30, height: 30 }} />
            <p className="facilities__facility-text">Washing Machine</p>
          </div>
        )}
        {props.hasKitchen && (
          <div className="facilities__facility">
            <KitchenOutlined sx={{ width: 30, height: 30 }} />
            <p className="facilities__facility-text">Kitchen</p>
          </div>
        )}
      </div>
      <div className="facilities__container">
        <div className="facilities__facility">
          <p className="facilities__facility-text">
            {props.roomsNumber == 1 ? `${props.roomsNumber} room` : `${props.roomsNumber} rooms`}
          </p>
        </div>
        <div className="facilities__facility">
          <p className="facilities__facility-text">
            {props.bedsNumber == 1 ? `${props.bedsNumber} bed` : `${props.bedsNumber} beds`}
          </p>
        </div>
      </div>
    </Facilities>
  );
}

export default RoomFacilities;
