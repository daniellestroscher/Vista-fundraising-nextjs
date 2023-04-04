import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
  searchQuery: string;
  setSearchQuery: (arg: string) => void;
};
export default function searchBar({ searchQuery, setSearchQuery }: Props) {
  return (
    <div className="search-box">
      <FontAwesomeIcon
        icon={faMagnifyingGlass as IconProp}
        className="search-icon"
      />
      <form>
        {/* <label htmlFor="header-search">
      <span className="box">
        Search Crowdfunds:
      </span>
    </label> */}
        <input
          className="search-input"
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          type="text"
          id="header-search"
          placeholder="Search by name or category"
        />
      </form>
    </div>
  );
}
