import { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
  searchQuery: string;
  setSearchQuery: (arg: string) => void;
};
export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: Props) {
  const [showInput, setShowInput] = useState(false);

  return (
    <div
      className="search-container"
      onMouseEnter={() => setShowInput(true)}
      onMouseLeave={() => setShowInput(false)}
    >
      <div className="search-box">
        <FontAwesomeIcon
          icon={faMagnifyingGlass as IconProp}
          className="search-icon"
        />
        {
          <input
            className={
              showInput ? "search-input slide-search-input" : "search-input"
            }
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
            type="text"
            id="header-search"
            placeholder="Search by name or category"
          />
        }
      </div>
    </div>
  );
}
