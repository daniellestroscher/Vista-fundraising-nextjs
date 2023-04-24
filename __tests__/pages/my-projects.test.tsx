import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MyProjects from "../../pages/my-projects";
import { readContract } from "@wagmi/core";
import { useAccount } from "wagmi";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathname: "/my-projects",
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
jest.mock("wagmi", () => {
  return {
    useAccount: jest
      .fn()
      .mockImplementation(() => ({ isConnected: true, address: "0x123" })),
    useContractRead: jest.fn().mockImplementation(() => 1000),
  };
});

describe("MyProjects", () => {
  test("display's proper header when the state is loaded and there are no crowdfunds", async () => {
    (readContract as jest.Mock).mockImplementation(() => {
      return [];
    });

    await waitFor(() => render(<MyProjects />));
    await waitFor(() =>
      expect(
        screen.getByText("You haven't created any crowdfunds.")
      ).toBeInTheDocument()
    );
  });
  test("display's proper header when there are crowdfunds to display", async () => {
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
    await waitFor(() => render(<MyProjects />));

    await waitFor(() =>
      expect(
        screen.getByText(
          "You created these awesome projects. see how they're doing!"
        )
      ).toBeInTheDocument()
    );
  });

  test("display's crowdfunds when there are crowdfunds to display", async () => {
    await waitFor(() => render(<MyProjects />));
    await waitFor(() => {
      expect(screen.getByText("Test Crowdfund One")).toBeInTheDocument();
    });
    expect(screen.getByText("short description")).toBeInTheDocument();
  });

  test("filters crowdfunds based on search query", async () => {
    await waitFor(() => render(<MyProjects />));
    const container = await waitFor(
      () => screen.getByPlaceholderText("Search by name or category").parentNode
    );
    const input = screen.getByPlaceholderText("Search by name or category");

    fireEvent.mouseEnter(container as ParentNode);
    act(() => {
      fireEvent.input(input, { target: { value: "New Query" } });
    });
    expect(screen.queryByText("Test Crowdfund One")).not.toBeInTheDocument();
    act(() => {
      fireEvent.input(input, { target: { value: "test" } });
    });
    expect(screen.queryByText("Test Crowdfund One")).toBeInTheDocument();
  });
});
