import "./Button.scss";

export function Button(props) {
  const { className, ...other } = props;

  return (
    <button className={`button ${className}`} {...other}>
      {props.children}
    </button>
  );
}

export default Button;
