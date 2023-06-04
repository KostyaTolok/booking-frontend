import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import AppLoader from "components/common/AppLoader";
import { Button as AppButton } from "components/common/Button";
import Description from "components/common/Description";
import RoomFacilities from "components/roomDetails/RoomFacilities";
import RoomInfo from "components/roomDetails/RoomInfo";
import AsideSearchForm from "components/search/AsideSearchForm";
import { ALERT_SEVERITIES } from "constants/enums";
import { CHECKOUT_LINK, LOGIN_LINK } from "constants/links";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setDatesTooltipOpen } from "redux/actions/tooltipsActions";
import AlertsService from "services/AlertsService";
import { DateFormatterService } from "services/DateFormatterService";
import { PaymentsApiService } from "services/PaymentsApiService";
import { SearchApiService } from "services/SearchApiService";

function RoomDetailsPage() {
  const params = useParams();
  const roomId = params.roomId;
  const [room, setRoom] = useState({
    id: 0,
    name: "",
    description: "",
    roomsNumber: 0,
    bedsNumber: 0,
    hasWashingMachine: false,
    hasKitchen: false,
    price: 0,
  });
  const [roomImages, setRoomImages] = useState([]);
  const hotelsList = useSelector((store) => store.hotelsList);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const infoRef = useRef(null);

  useEffect(() => {
    SearchApiService.getRoomDetails(roomId)
      .then((response) => {
        setRoom({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          roomsNumber: response.data.rooms_number,
          bedsNumber: response.data.beds_number,
          price: response.data.price,
          hasKitchen: response.data.has_kitchen,
          hasWashingMachine: response.data.has_washing_machine,
        });

        let images = [];
        response.data.images.forEach((element) => {
          images.push(element.image_key);
        });
        setRoomImages(images);
      })
      .catch((error) => {
        AlertsService.showAlert(error);
      });
  }, []);

  function hadleBookClick() {
    if (!isAuthenticated) {
      navigate(LOGIN_LINK);
      AlertsService.showAlert("Please login or register to book a room", ALERT_SEVERITIES.WARNING);
    } else if (hotelsList.startDate === "" || hotelsList.endDate === "") {
      setDialogOpen(true);
      dispatch(setDatesTooltipOpen(true));
    } else {
      setLoadingCheckout(true);
      PaymentsApiService.paymentSheet({
        apartmentId: roomId,
        startDate: hotelsList.startDate,
        endDate: hotelsList.endDate,
      })
        .then((response) => {
          let days = DateFormatterService.getDaysBetweenDates(
            new Date(hotelsList.startDate),
            new Date(hotelsList.endDate)
          );
          let price = days * room.price;

          navigate(CHECKOUT_LINK, {
            state: {
              clientSecret: response.data.client_secret,
              price: price,
            },
          });
        })
        .catch((error) => {
          setLoadingCheckout(false);
          AlertsService.showAlert(error);
        });
    }
  }

  function handleDialogClose() {
    setDialogOpen(false);
    infoRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Grid container spacing={3.75}>
      <AppLoader open={loadingCheckout} />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle id="alert-dialog-title">Please select booking dates</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To book selected apartments you need to pick dates in search form
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={handleDialogClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item xs={3}>
        <AsideSearchForm />
      </Grid>
      <Grid item xs={9}>
        <RoomInfo ref={infoRef} name={room.name} price={room.price} images={roomImages} />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={9}>
        <Description text={room.description} />
      </Grid>
      <Grid item xs={3}>
        <RoomFacilities
          hasWashingMachine={room.hasWashingMachine}
          hasKitchen={room.hasKitchen}
          roomsNumber={room.roomsNumber}
          bedsNumber={room.bedsNumber}
        />
        <Divider sx={{ marginY: 3.75 }} />
        <AppButton
          className="button_large button_orange button_rounded button_full-width"
          type="button"
          onClick={hadleBookClick}
        >
          Book Room
        </AppButton>
      </Grid>
    </Grid>
  );
}

export default RoomDetailsPage;
