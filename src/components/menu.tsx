import React, { Dispatch, SetStateAction } from "react";
import styles from "../../styles/components/menu.module.css";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlash } from "@fortawesome/free-solid-svg-icons";

type props = {
  setMenuState: Dispatch<SetStateAction<boolean>>;
  menuState: boolean;
};
export default function Menu({ setMenuState, menuState }: props) {
  return (
    <nav
      className={`${styles.nav} ${menuState ? "" : styles.slide}`}
      role="navigation"
    >
      <FontAwesomeIcon
        icon={faSlash}
        onClick={() => {
          setMenuState(!menuState);
        }}
        className={styles.closeIcon}
        data-testid="close-icon"
      />
      <Link
        href="/"
        as={`/`}
        className={`${styles.navItem} ${menuState ? "" : styles.hideOverflow}`}
      >
        <h3>Find places to give.</h3>
      </Link>
      <Link
        href="/create"
        as={`/create`}
        className={`${styles.navItem} ${menuState ? "" : styles.hideOverflow}`}
      >
        <h3>Create a new funding project.</h3>
      </Link>
      <Link
        href="/my-projects"
        as={`/my-projects`}
        className={`${styles.navItem} ${menuState ? "" : styles.hideOverflow}`}
      >
        <h3>My funding projects.</h3>
      </Link>
      <Link
        href="/i-support"
        as={`/i-support`}
        className={`${styles.navItem} ${menuState ? "" : styles.hideOverflow}`}
      >
        <h3>Funding project's i support.</h3>
      </Link>
    </nav>
  );
}
