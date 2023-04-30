import "./SearchForm.scss";
import SearchInputs from "./SearchInputs";
import Button from "components/common/Button";

function SearchForm() {
  return (
    <form className="search-form">
      <h1 className="search-form__heading">Find your next stay</h1>
      <p className="search-form__subtitle">Search deals on hotels, homes, and much more...</p>
      <div className="search-form__wrapper">
        <SearchInputs />
        <Button className="button_medium button_white search-form__button">Search</Button>
      </div>
    </form>
  );
}

export default SearchForm;
