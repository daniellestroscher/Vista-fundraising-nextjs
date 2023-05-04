import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import NavBar from "../src/components/navBar";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

jest.mock("@rainbow-me/rainbowkit", () => {
  return {
    ConnectButton: jest
      .fn()
      .mockImplementation(() => <div>Mock ConnectButton</div>),
  };
});

jest.mock("wagmi", () => {
  return {
    useAccount: jest.fn().mockImplementation(() => ({ isConnected: true })),
  };
});

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathname: "/",
  })),
}));

describe("Nav Bar", function () {
  test("contains the expected elements", () => {
    render(<NavBar searchQuery={""} setSearchQuery={undefined} />);
    expect(screen.getByText("Vista Fundraising,")).toBeInTheDocument();
    expect(
      screen.getByText("support projects that make a difference.")
    ).toBeInTheDocument();
    expect(screen.getByText("Mock ConnectButton")).toBeInTheDocument();
  });

  test("does not display menu/search button until user connects wallet", () => {
    (useAccount as jest.Mock).mockImplementation(() => ({
      isConnected: false,
    }));
    render(<NavBar searchQuery={""} setSearchQuery={undefined} />);
    expect(screen.queryByRole("search-menu-box")).not.toBeInTheDocument();
  });

  test("renders the SearchBar component if the current route is not /create", () => {
    (useAccount as jest.Mock).mockImplementation(() => ({
      isConnected: true,
    }));

    render(<NavBar searchQuery={""} setSearchQuery={undefined} />);
    expect(screen.getByRole("search")).toBeInTheDocument();
  });

  test("does not render the SearchBar component if the current route is /create", () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: "/create",
    }));
    render(<NavBar searchQuery={""} setSearchQuery={undefined} />);
    expect(screen.queryByRole("search")).not.toBeInTheDocument();
  });

  test("toggles the menuState when the menu button is clicked", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: "/",
    }));

    const { debug } = render(
      <NavBar searchQuery={""} setSearchQuery={undefined} />
    );

    const menuButton = await waitFor(() => screen.getByTestId("menu-button"));
    const menu = await waitFor(() => screen.getByRole("navigation"));

    expect(menu.classList.contains("slide")).toBe(true); //menu is closed.
    await waitFor(() => fireEvent.click(menuButton));
    expect(menu.classList.contains("slide")).toBe(false); //menu is open.
  });
});
