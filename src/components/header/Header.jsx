import { Link } from "react-router-dom";
import "./Header.scss";
import AuthInfo from "./AuthInfo";
import SearchForm from "components/search/SearchForm";
import { HOME_LINK } from "constants/links";
import { Container } from "@mui/material";

function Header(props) {
  return (
    <header className="header">
      <Container maxWidth="xl">
        <nav className="nav">
          <Link to={HOME_LINK} className="nav__logo">
            Booking
          </Link>
          <AuthInfo />
        </nav>
        {props.showSearch && <SearchForm />}
      </Container>
    </header>
  );
}

export default Header;
