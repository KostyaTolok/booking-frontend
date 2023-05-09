import { InputAdornment, TextField } from "@mui/material";
import "./AppTextField.scss";
import { Controller } from "react-hook-form";

function AppTextField(props) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <TextField
          {...field}
          className={`text-field ${props.className}`}
          label={props.label}
          error={props.helperText ? true : false}
          helperText={props.helperText}
          variant={props.variant || "standard"}
          onClick={props.onClick}
          type={props.type}
          InputProps={{
            disableUnderline: props.underline || true,
            readOnly: props.readOnly,
            endAdornment: <InputAdornment position="end">{props.endAdornment}</InputAdornment>,
          }}
          sx={{ input: { cursor: props.readOnly ? "pointer" : "auto" }, cursor: props.readOnly ? "pointer" : "auto" }}
          color="warning"
        />
      )}
    />
  );
}

export default AppTextField;
