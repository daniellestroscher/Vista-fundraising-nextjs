import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type Props = {
  searchQuery: string;
  setSearchQuery: (arg: string) => void;
};
export default function SearchBar({ searchQuery, setSearchQuery }: Props) {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="search-box">
      <FontAwesomeIcon
        icon={faMagnifyingGlass as IconProp}
        className="search-icon"
        onMouseOver={() => setShowInput(true)}
      />
      {
        showInput &&
      <form>
        <input
          className="search-input"
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          onMouseOut={() => setShowInput(false)}
          type="text"
          id="header-search"
          placeholder="Search by name or category"
        />
      </form>
      }
    </div>
  );
}
