import Button from "components/common/Button";
import { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { NavigateBeforeRounded, NavigateNextRounded } from "@mui/icons-material";
import "./Arrow.scss";

function Arrow(props) {
  const { isFirstItemVisible, isLastItemVisible, scrollPrev, scrollNext } = useContext(VisibilityContext);

  function scroll() {
    if (props.left) {
      scrollPrev();
    } else {
      scrollNext();
    }
  }

  return (
    <Button
      className="button_icon button_white arrow"
      style={{ visibility: (props.left ? isFirstItemVisible : isLastItemVisible) ? "hidden" : "visible" }}
      onClick={() => scroll()}
    >
      {props.left ? <NavigateBeforeRounded /> : <NavigateNextRounded />}
    </Button>
  );
}

export default Arrow;
