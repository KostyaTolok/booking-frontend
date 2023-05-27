import { Paper } from "@mui/material";
import "./AppSearchFilters.scss";

function AppSearchFilters(props) {
  return (
    <Paper className="search-filters" variant="outlined">
      {props.children}
    </Paper>
  );
}

export default AppSearchFilters;
