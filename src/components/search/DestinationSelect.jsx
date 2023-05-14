import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import "./DestinationSelect.scss";
import SearchTextField from "./SearchTextField";
import { SearchApiService } from "services/SearchApiService";
import { useDispatch, useSelector } from "react-redux";
import { setDestination } from "redux/actions/hotelsListActions";
import AppPopper from "components/common/AppPopper";
import { setDestinationTooltipOpen } from "redux/actions/tooltipsActions";

function DestinationSelect(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const destination = useSelector((store) => store.hotelsList.destination);
  const tooltipOpen = useSelector((store) => store.tooltips.destinationTooltipOpen);
  const [citiesLoaded, setCitiesLoaded] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!citiesLoaded) {
      SearchApiService.getCities().then((response) => {
        let cities = [];

        response.data.forEach((element) => {
          cities.push({ name: element.name, id: element.id });
        });

        setCities(cities);
        setCitiesLoaded(true);
      });
    }
  }, [citiesLoaded]);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    setOpen(true);
    dispatch(setDestinationTooltipOpen(false));
  }

  function handleListItemClick(id, name) {
    dispatch(
      setDestination({
        destinationId: id,
        destination: name,
      })
    );
    setOpen(false);
  }

  function handleInputChange(event) {
    let selectedName = event.target.value;
    dispatch(
      setDestination({
        destination: selectedName,
      })
    );
    setOpen(true);
  }

  const filteredCities = cities.filter((city) => {
    return city.name.toLowerCase().includes(destination.toLowerCase());
  });

  return (
    <div className="destination-select-wrapper">
      <SearchTextField
        value={destination}
        label={!props.aside ? "Destination" : undefined}
        hiddenLabel={props.aside}
        onChange={(event) => handleInputChange(event)}
        onClick={handleClick}
        tooltip={"To start searching, enter a destination"}
        tooltipOpen={tooltipOpen}
      />
      <AppPopper open={open} setOpen={setOpen} anchorEl={anchorEl}>
        <List>
          {filteredCities.map((city) => {
            return (
              <ListItem disablePadding key={city.id}>
                <ListItemButton onClick={() => handleListItemClick(city.id, city.name)}>
                  <ListItemText primary={city.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </AppPopper>
    </div>
  );
}

export default DestinationSelect;
