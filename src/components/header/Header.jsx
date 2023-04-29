import { Link } from "react-router-dom";
import "./Header.scss";
import AuthInfo from "./AuthInfo";
import SearchForm from "components/search/SearchForm";

function Header(props) {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav__logo">
          Booking
        </Link>
        <AuthInfo />
      </nav>
      {props.showSearch && <SearchForm />}
    </header>
  );
}

export default Header;
