import React, { useState } from "react";
import styles from "../../styles/components/navBar.module.css";
import Menu from "./menu";
import SearchBar from "./searchBar";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

type props = {
  searchQuery: string;
  setSearchQuery: undefined | ((arg: string) => void);
};
export default function NavBar({ searchQuery, setSearchQuery }: props) {
  const [menuState, setMenuState] = useState<boolean>(false);
  const router = useRouter();
  const { isConnected } = useAccount();

  return (
    <>
      <section className={styles.appHeader}>
        <div className={styles.upperHeader}>
          <div className={styles.title}>
            <h2 className={styles.name}>Vista Fundraising,</h2>
            <h4 className={styles.slogan}>
              support projects that make a difference.
            </h4>
          </div>
          <section className={styles.connectButtonMenu}>
            <ConnectButton
              chainStatus="icon"
              showBalance={false}
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
            />
          </section>
        </div>
      </section>
      {router.pathname === "/" && !isConnected ? (
        <></>
      ) : (
        <div className={styles.navContainer}>
          <section className={styles.navigationBox} role="search-menu-box">
            {router.pathname !== "/create" && (
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery as (arg: string) => void}
              />
            )}
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => setMenuState(!menuState)}
              className={styles.menuBars}
              data-testid="menu-button"
            />
          </section>
        </div>
      )}
      <Menu setMenuState={setMenuState} menuState={menuState} />
    </>
  );
}
