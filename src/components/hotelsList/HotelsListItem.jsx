import { Link } from "react-router-dom";
import "./HotelsListItem.scss";
import Card from "components/common/Card";
import Badge from "components/common/Badge";
import AppImage from "components/common/AppImage";
import { Suspense } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";

function HotelsListItem(props) {
  return (
    <Link to="/">
      <Card className="hotel-list-item">
        <Suspense
          fallback={
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 1 }}>
              <CircularProgress color="warning" />
            </Box>
          }
        >
          <AppImage className="hotel-list-item__image" src={props.first_image} />
        </Suspense>
        <div className="hotel-list-item__info">
          <div className="hotel-list-item__name-wrapper">
            <p className="hotel-list-item__name">{props.name}</p>
            <Badge className="hotel-list-item__rating">{props.rating}</Badge>
          </div>
          <Grid container>
            <Grid item xs={10}>
              <p className="hotel-list-item__description">{props.description}</p>
            </Grid>
          </Grid>
          <p className="hotel-list-item__price">{props.min_price} USD</p>
        </div>
      </Card>
    </Link>
  );
}

export default HotelsListItem;
