import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type Props = {
  searchQuery: string;
  setSearchQuery: (arg: string) => void;
  top: number;
  right: number;
};
export default function SearchBar({ searchQuery, setSearchQuery, top, right }: Props) {
  const [showInput, setShowInput] = useState(false);

  return (
    <div
      className="search-container"
      onMouseEnter={() => setShowInput(true)}
      onMouseLeave={() => setShowInput(false)}
      style={{position: "absolute", top: `${top}px`, right: `${right}px`}}
    >
      <div
        className="search-box"
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass as IconProp}
          className="search-icon"
        />
        {
          <form>
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
          </form>
        }
      </div>
    </div>
  );
}
