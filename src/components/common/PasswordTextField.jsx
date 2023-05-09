import { IconButton } from "@mui/material";
import AppTextField from "./AppTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

function PasswordTextField(props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AppTextField
      {...props}
      className="form__input"
      variant="filled"
      type={showPassword ? "text" : "password"}
      endAdornment={
        <IconButton edge="end" onClick={() => setShowPassword((show) => !show)}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      }
    />
  );
}

export default PasswordTextField;
