import { Box, CircularProgress, Grid } from "@mui/material";
import AppImage from "components/common/AppImage";
import { ROOM_LINK } from "constants/links";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import AppListItem from "components/common/AppListItem";

function RoomsListItem(props) {
  return (
    <Link to={`${ROOM_LINK}/${props.id}`}>
      <AppListItem>
        <Suspense
          fallback={
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 1 }}>
              <CircularProgress color="warning" />
            </Box>
          }
        >
          <AppImage className="list-item__image" src={props.first_image} />
        </Suspense>
        <div className="list-item__info">
          <p className="list-item__name">{props.name}</p>
          <Grid container>
            <Grid item xs={10}>
              <p className="list-item__description">{props.description}</p>
            </Grid>
          </Grid>
          <p className="list-item__price">{props.price} USD</p>
        </div>
      </AppListItem>
    </Link>
  );
}

export default RoomsListItem;
