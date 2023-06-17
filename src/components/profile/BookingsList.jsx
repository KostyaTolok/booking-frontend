import BookingsListItem from "./BookingsListItem";
import "./BookingsList.scss";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { BookingTokenApiService } from "services/BookingTokenApiService";
import AlertsService from "services/AlertsService";
import QRCode from "react-qr-code";
import { ORANGE_COLOR } from "constants/colors";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AppLoader from "components/common/AppLoader";
import { ALERT_SEVERITIES } from "constants/enums";

function BookingsList(props) {
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [currentQrToken, setCurrentQrToken] = useState("");
  const [qrTokens, setQrTokens] = useState({});
  const [loading, setLoading] = useState(false);

  function handleClose() {
    setQrModalOpen(false);
  }

  function handleShowQrClick(apartmentId, bookingId) {
    if (bookingId in qrTokens) {
      setCurrentQrToken(qrTokens[bookingId]);
      setQrModalOpen(true);
    } else {
      setLoading(true);

      BookingTokenApiService.getBookingQrToken(apartmentId)
        .then((response) => {
          setCurrentQrToken(response.data);
          setQrModalOpen(true);
          setQrTokens({ ...qrTokens, [bookingId]: response.data });
          setLoading(false);
        })
        .catch((error) => {
          if (error?.response?.status == 404 || error?.response?.status == 403) {
            AlertsService.showAlert(
              "Booking not started. QR code is only available on its dates span.",
              ALERT_SEVERITIES.WARNING
            );
          } else {
            AlertsService.showAlert(error);
          }
          setLoading(false);
        });
    }
  }

  return (
    <div className="booking-list">
      <AppLoader open={loading} />
      <h1 className="booking-list__title">Bookings</h1>
      {props.bookings.length !== 0 ? (
        props.bookings.map((booking) => (
          <BookingsListItem key={booking.id} {...booking} handleShowQrClick={handleShowQrClick} />
        ))
      ) : (
        <h2>You have not booked any rooms yet</h2>
      )}
      <Dialog fullWidth={true} maxWidth="xs" open={qrModalOpen} onClose={handleClose}>
        <DialogTitle className="alert-dialog-title">
          Show this code to open the door
          <CloseRoundedIcon sx={{ "&:hover": { color: ORANGE_COLOR } }} onClick={handleClose} />
        </DialogTitle>
        <DialogContent sx={{ margin: "0 auto" }}>
          <QRCode value={currentQrToken} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookingsList;
