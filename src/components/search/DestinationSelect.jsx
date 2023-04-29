import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "components/common/Modal";
import "./DestinationSelect.scss";
import SearchTextField from "./SearchTextField";
import { SearchApiService } from "services/SearchApiService";

function DestinationSelect() {
  const [open, setOpen] = useState(false);
  const [selectedCity, setCity] = useState({
    name: "",
    id: -1,
  });
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
  });

  function handleListItemClick(index, name) {
    setCity({
      name: name,
      index: index,
    });
    setOpen(false);
  }

  function handleInputChange(event) {
    let selectedName = event.target.value;
    setCity({
      ...selectedCity,
      name: selectedName,
    });
  }

  const filteredCities = cities.filter((city) => {
    return city.name.toLowerCase().includes(selectedCity.name.toLowerCase());
  });

  return (
    <div className="destination-select-wrapper">
      <SearchTextField
        value={selectedCity.name}
        label="Destination"
        onChange={(event) => handleInputChange(event)}
        onClick={() => setOpen(!open)}
      />
      <Modal open={open} setOpen={setOpen}>
        <div className="destination-modal">
          <List>
            {filteredCities.map((city) => {
              return (
                <ListItem disablePadding key={city.id}>
                  <ListItemButton
                    selected={city.id === selectedCity.id}
                    onClick={() => handleListItemClick(city.id, city.name)}
                  >
                    <ListItemText primary={city.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </div>
      </Modal>
    </div>
  );
}

export default DestinationSelect;
