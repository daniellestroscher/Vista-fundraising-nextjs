import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import CrowdfundCard from "../src/components/crowdfundCard";

import { useRouter } from "next/router";

const mockCrowdfund = {
  id: 1,
  fundId: 0,
  owner: "",
  goalReached: false,
  name: "Test Fundraiser",
  descriptionShort: "A short description",
  category: "Research",
  image: "https://example.com/image.jpg",
  goal: 100000,
  crowdfundContract: "0x123",
};
jest.mock("@wagmi/core", () => ({
  prepareSendTransaction: jest.fn(),
  sendTransaction: jest.fn(),
}));
jest.mock("wagmi", () => ({
  useContractRead: jest.fn().mockImplementation(() => 1000),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathname: "/",
  })),
}));

describe("CrowdfundCard", function () {
  test("renders the fundraiser information", async () => {
    render(<CrowdfundCard crowdfund={mockCrowdfund} />);
    expect(screen.getByText("Test Fundraiser")).toBeInTheDocument();
    expect(screen.getByText("A short description")).toBeInTheDocument();
    expect(screen.getByAltText("Fundraiser")).toBeInTheDocument();
    expect(screen.getByAltText("category symbol")).toBeInTheDocument();
    expect(
      screen.getByText("Wei needed to reach our goal.")
    ).toBeInTheDocument();
  });

  test("renders the remove button when the goal has been reached and on correct page (connected wallets fundraisers)", () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: "/my-projects",
    }));
    render(
      <CrowdfundCard crowdfund={{ ...mockCrowdfund, goalReached: true }} />
    );
    expect(screen.getByText("Remove")).toBeInTheDocument();
  });

  test("renders the donate button when the goal has not been reached", () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: "/",
    }));
    render(
      <CrowdfundCard crowdfund={{ ...mockCrowdfund, goalReached: false }} />
    );
    expect(screen.getByText("Donate")).toBeInTheDocument();
  });

  // test("calls the remove function when the remove button is clicked", async () => {
  //   (useRouter as jest.Mock).mockImplementation(() => ({
  //     pathname: "/my-projects",
  //   }));
  //   const myFunctionMock = jest.spyOn(module, "removeCrowdfund");
  //   console.log(myFunctionMock)
  //   const { getByText } = render(
  //     <CrowdfundCard crowdfund={{ ...mockCrowdfund, goalReached: true }} />
  //   );
  //   const removeButton = getByText("Remove");

  //   await waitFor(() => fireEvent.click(removeButton));
  //   expect(myFunctionMock).toHaveBeenCalled();
  // });
});
