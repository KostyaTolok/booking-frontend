import { Link } from "react-router-dom";
import Badge from "components/common/Badge";
import AppImage from "components/common/AppImage";
import { Suspense } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { HOTELS_LIST_LINK } from "constants/links";
import AppListItem from "components/common/AppListItem";

function HotelsListItem(props) {
  return (
    <Link to={`${HOTELS_LIST_LINK}/${props.id}`}>
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
          <div className="list-item__name-wrapper">
            <p className="list-item__name">{props.name}</p>
            <Badge className="list-item__rating">{props.rating}</Badge>
          </div>
          <Grid container>
            <Grid item xs={10}>
              <p className="list-item__description">{props.description}</p>
            </Grid>
          </Grid>
          <p className="list-item__price">{props.min_price} USD</p>
        </div>
      </AppListItem>
    </Link>
  );
}

export default HotelsListItem;
