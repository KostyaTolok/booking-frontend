import { Alert, IconButton, Slide, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./AppAlert.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "redux/actions/alertActions";

function AppAlert() {
  const dispatch = useDispatch();
  const alertMessage = useSelector((store) => store.alert.message);
  const alertSeverity = useSelector((store) => store.alert.severity);
  const open = useSelector((store) => store.alert.open);

  function onCloseAlert() {
    dispatch(closeAlert());
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={onCloseAlert}
      autoHideDuration={6000}
      sx={{ marginBottom: 5 }}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
    >
      <Alert
        severity={alertSeverity}
        className="alert"
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={onCloseAlert}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}

export default AppAlert;
