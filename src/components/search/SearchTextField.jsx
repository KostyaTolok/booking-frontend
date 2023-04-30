import { TextField } from "@mui/material";
import "./SearchTextField.scss";

function SearchTextField(props) {
  return (
    <TextField
      value={props.value}
      className="search-text-field"
      label={props.label}
      variant="standard"
      onClick={props.onClick}
      onChange={props.onChange}
      InputProps={{ disableUnderline: true, readOnly: props.readOnly }}
      sx={{ input: { cursor: props.readOnly ? "pointer" : "auto" }, cursor: props.readOnly ? "pointer" : "auto" }}
      color="warning"
    />
  );
}

export default SearchTextField;
