import { Dispatch, SetStateAction } from "react";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSlash } from "@fortawesome/free-solid-svg-icons";

type props = {
  setMenuState: Dispatch<SetStateAction<boolean>>;
  menuState: boolean;
};
export default function Menu({ setMenuState, menuState }: props) {
  return (
    <nav className={menuState ? "nav slide" : "nav"}>
      <FontAwesomeIcon
        icon={faSlash}
        onClick={() => {
          setMenuState(!menuState);
        }}
        className="close-icon"
      />
      <a className="nav-item" href="/">
        <h3>Find places to give.</h3>
      </a>
      <a className="nav-item" href="/create">
        <h3>Create a new funding project.</h3>
      </a>
      <a className="nav-item" href="/my-projects">
        <h3>My funding projects.</h3>
      </a>
      <a className="nav-item" href="/i-support">
        <h3>Funding project's i support.</h3>
      </a>
    </nav>
  );
}
