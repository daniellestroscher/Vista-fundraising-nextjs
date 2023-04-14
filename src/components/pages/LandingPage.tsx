import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="main-container">
      <section className="info-box">
        <p className="intro-paragraph">
          Hey! Welcome to Vista, we're so glad you're here! <br />
          <br /> This is the place to invest in projects and people that you're
          passionate about, or you can create a project and give
          others an opportunity to support you too! <br />
          <br /> If you'd like to browse available projects & causes, or create your own,
          please connect your wallet.
        </p>
      </section>
      <section>
        <div className="connect-wallet-banner">
          <p className="sliding-words">
            Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet
            Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet
            Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet
          </p>
        </div>
      </section>
    </div>
  );
}
