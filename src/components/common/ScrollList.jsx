import Arrow from "components/common/Arrow";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "./ScrollList.scss";

function ScrollList(props) {
  return (
    <>
      <h2 className="scroll-list-title">{props.title}</h2>
      <ScrollMenu LeftArrow={<Arrow left />} RightArrow={<Arrow />}>
        {props.children}
      </ScrollMenu>
    </>
  );
}

export default ScrollList;
