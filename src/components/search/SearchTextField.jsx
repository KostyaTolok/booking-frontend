import { TextField, Tooltip } from "@mui/material";
import "./SearchTextField.scss";

function SearchTextField(props) {
  return (
    <Tooltip
      disableFocusListener
      disableHoverListener
      disableTouchListener
      arrow
      title={props.tooltip}
      open={props.tooltipOpen}
    >
      <TextField
        value={props.value}
        className="search-text-field"
        label={props.label}
        hiddenLabel={props.hiddenLabel}
        variant="standard"
        onClick={props.onClick}
        onChange={props.onChange}
        InputProps={{ disableUnderline: true, readOnly: props.readOnly }}
        sx={{ input: { cursor: props.readOnly ? "pointer" : "auto" }, cursor: props.readOnly ? "pointer" : "auto" }}
        color="warning"
      />
    </Tooltip>
  );
}

export default SearchTextField;
