import React from "react";
import { render, screen } from "@testing-library/react";
import CategoryList from "../src/components/categoryList";

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

describe("CategoryList", () => {
  const mockList = [
    {
      fundId: 1,
      crowdfundContract: "",
      name: "TestCrowdfund One",
      descriptionShort: "",
      image: "",
      category: "Technology",
      owner: "",
      goal: 10000,
      goalReached: false,
    },
    {
      fundId: 2,
      crowdfundContract: "",
      name: "TestCrowdfund Two",
      descriptionShort: "",
      image: "",
      category: "Technology",
      owner: "",
      goal: 5000,
      goalReached: false,
    },
    {
      fundId: 3,
      crowdfundContract: "",
      name: "TestCrowdfund Three",
      descriptionShort: "",
      image: "",
      category: "Food",
      owner: "",
      goal: 2000,
      goalReached: false,
    },
  ];

  test("renders category title if filtered list is not empty", () => {
    render(<CategoryList category="Technology" list={mockList} />);
    const categoryTitle = screen.getByText("Technology");
    expect(categoryTitle).toBeInTheDocument();
  });

  test("does not render category title if filtered list is empty", () => {
    render(<CategoryList category="Sports" list={mockList} />);
    const categoryTitle = screen.queryByText("Sports");
    expect(categoryTitle).toBeNull();
  });

  test("renders filtered crowdfund cards", () => {
    render(<CategoryList category="Technology" list={mockList} />);
    const crowdfundCards = screen.getAllByRole("article");
    expect(crowdfundCards).toHaveLength(2);
  });

  test("does not render crowdfund cards if filtered list is empty", () => {
    render(<CategoryList category="Sports" list={mockList} />);
    const crowdfundCards = screen.queryAllByRole("article");
    expect(crowdfundCards).toHaveLength(0);
  });
});
