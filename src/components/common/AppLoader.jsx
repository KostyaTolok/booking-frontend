import { Backdrop, CircularProgress } from "@mui/material";
import { GREY_COLOR } from "constants/colors";

function AppLoader(props) {
  return (
    <Backdrop sx={{ color: GREY_COLOR, zIndex: (theme) => theme.zIndex.drawer + 1 }} open={props.open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default AppLoader;
