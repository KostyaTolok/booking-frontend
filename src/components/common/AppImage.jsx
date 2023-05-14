import { useImage } from "react-image";

function AppImage(props) {
  const { src } = useImage({
    srcList: props.src,
  });

  return <img className={props.className} src={src} />;
}

export default AppImage;
