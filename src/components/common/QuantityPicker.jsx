import { useState } from "react";
import "./QuantityPicker.scss";
import Button from "./Button";

function QuantityPicker(props) {
  let [value, setValue] = useState(props.defaultValue);

  function decrementValue() {
    if (value > props.minValue) {
      let updatedValue = --value;
      setValue(updatedValue);
      props.onChange(updatedValue);
    }
  }

  function incrementValue() {
    if (value < props.maxValue) {
      let updatedValue = ++value;
      setValue(updatedValue);
      props.onChange(updatedValue);
    }
  }

  return (
    <div className="quantity-picker">
      <Button type="button" className="quantity-picker__modifier" onClick={decrementValue}>
        -
      </Button>
      <input readOnly className="quantity-picker__display" value={value} />
      <Button type="button" className="quantity-picker__modifier" onClick={incrementValue}>
        +
      </Button>
    </div>
  );
}

export default QuantityPicker;
