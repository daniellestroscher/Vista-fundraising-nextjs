import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../../pages/index";
import { readContract } from "@wagmi/core";
import { useAccount } from "wagmi";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathname: "/",
  })),
}));
jest.mock("@rainbow-me/rainbowkit", () => {
  return {
    ConnectButton: jest
      .fn()
      .mockImplementation(() => <div>Mock ConnectButton</div>),
  };
});
jest.mock("@wagmi/core", () => ({
  readContract: jest.fn().mockImplementation(() => {
    return [
      {
        fundId: 1,
        metaUrl: "meta url",
        crowdfundContract: "",
        owner: "0x123",
        goal: 2000,
        goalReached: false,
      },
    ];
  }),
}));
jest.mock("wagmi", () => {
  return {
    useAccount: jest
      .fn()
      .mockImplementation(() => ({ isConnected: true, address: "0x123" })),
  };
});
jest.mock("axios", () => ({
  get: jest.fn().mockImplementation(() => {
    const meta = {
      data: {
        name: "Test Crowdfund One",
        descriptionShort: "short description",
        image: "",
        category: "",
      },
    };
    return meta;
  }),
}));

describe("Home", () => {
  test("renders without crashing", () => {
    render(<Home />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  test("displays a message when no crowdfunds are available", async () => {
    (readContract as jest.Mock).mockImplementation(() => {
      return [];
    });

    render(<Home />);

    await waitFor(() =>
      expect(
        screen.getByText("No Crowdfunds in this marketplace.")
      ).toBeInTheDocument()
    );
  });

  test("displays category lists when crowdfunds are available", async () => {
    (readContract as jest.Mock).mockImplementation(() => {
      return [
        {
          fundId: 1,
          metaUrl: "meta url",
          crowdfundContract: "",
          owner: "0x123",
          goal: 2000,
          goalReached: false,
        },
      ];
    });

    await waitFor(() => render(<Home />));
    await waitFor(() => expect(screen.getAllByRole("list")).toBeDefined());
  });

  test("displays the landing page and connect button when use is not connected", () => {
    (useAccount as jest.Mock).mockImplementation(() => {
      return { isConnected: false };
    });

    render(<Home />);

    const connectButton = screen.getByText("Mock ConnectButton");
    const page = screen.getByRole("landing-page");
    const welcome = screen.getByText(
      "Hey! Welcome to Vista, we're so glad you're here! This is the place to invest in projects and people that you're passionate about, or you can create a project and give others an opportunity to support you too! If you'd like to browse available projects & causes, or create your own, please connect your wallet."
    );
    const banner = screen.getByText(
      "Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet Connect-Wallet"
    );

    expect(connectButton).toBeInTheDocument();
    expect(welcome).toBeInTheDocument();
    expect(banner).toBeInTheDocument();
    expect(page).toBeDefined();
  });
});
