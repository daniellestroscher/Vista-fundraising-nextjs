import { useState } from "react";
import "./navBar.css";
import Menu from "./Menu";
import SearchBar from "./SearchBar";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

type props = {
  searchQuery: string;
  setSearchQuery: undefined | ((arg: string) => void);
}
export default function NavBar({ searchQuery, setSearchQuery }: props) {
  const [menuState, setMenuState] = useState(false);
  const location = useLocation();
  return (
    <div className="nav-container">
    <section className="navigation">
      {
        location.pathname !== "/create" &&
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery as (arg: string) => void} />
      }
      <FontAwesomeIcon
        icon={faBars}
        onClick={(e) => setMenuState(!menuState)}
        className="menu-bars"
      />
    </section>

    <Menu setMenuState={setMenuState} menuState={menuState} />
    </div>
  );
}
