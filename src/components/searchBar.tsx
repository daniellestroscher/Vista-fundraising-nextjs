import React, { useState } from "react";
import styles from "../../styles/components/searchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
  searchQuery: string;
  setSearchQuery: (arg: string) => void;
};
export default function SearchBar({ searchQuery, setSearchQuery }: Props) {
  const [showInput, setShowInput] = useState(false);

  return (
    <div
      className={styles.searchContainer}
      onMouseEnter={() => setShowInput(true)}
      onMouseLeave={() => setShowInput(false)}
      role="search"
      data-testid="search-bar-box"
    >
      <div className={styles.searchBox}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass as IconProp}
          className={styles.searchIcon}
          data-testid="mag-glass"
        />
        {
          <input
            className={`${styles.searchInput} ${
              showInput ? styles.slideSearchInput : ""
            }`}
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
