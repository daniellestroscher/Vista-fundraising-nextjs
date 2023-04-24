import React from "react";
import styles from "../styles/pages/landing-page.module.css";

export default function LandingPage() {
  return (
    <div className={styles.mainContainer} role="landing-page">
      <section className={styles.infoBox}>
        <p className={styles.introParagraph}>
          Hey! Welcome to Vista, we're so glad you're here! <br />
          <br /> This is the place to invest in projects and people that you're
          passionate about, or you can create a project and give others an
          opportunity to support you too! <br />
          <br /> If you'd like to browse available projects & causes, or create
          your own, please connect your wallet.
        </p>
      </section>
      <section>
        <div className={styles.connectWalletBanner}>
          <p className={styles.slidingWords}>
            Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet
            Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet
            Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet
          </p>
        </div>
      </section>
    </div>
  );
}
