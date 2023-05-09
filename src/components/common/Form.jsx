import "./Form.scss";

function Form(props) {
  const { className, title, subtitle, children, ...other } = props;
  return (
    <div className="form-wrapper">
      <form className={`form ${className}`} {...other}>
        <p className="form__title">{title}</p>
        <p className="form__subtitle">{subtitle}</p>
        {children}
      </form>
    </div>
  );
}

export default Form;
