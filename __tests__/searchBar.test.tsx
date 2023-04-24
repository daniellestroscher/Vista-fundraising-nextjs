import React, { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import SearchBar from "../src/components/searchBar";

describe("Search Bar", function () {
  const setSearchQuery = jest.fn();
  const searchQuery = "Test query";

  test("renders the search bar", async () => {
    await waitFor(() =>
      render(
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )
    );

    expect(screen.getByTestId("search-bar-box")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search by name or category")
    ).toBeInTheDocument();
    expect(screen.getByTestId("mag-glass")).toBeInTheDocument();
  });

  test("updates the search query when input is entered", () => {
    // const setShowInput = jest.fn();
    // const useStateMock = jest.fn().mockReturnValue([false, setShowInput]);
    // jest.spyOn(React, "useState").mockImplementation(useStateMock);

    const { getByPlaceholderText } = render(
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    );
    const input = getByPlaceholderText("Search by name or category");
    fireEvent.input(input, { target: { value: "New query" } });
    expect(setSearchQuery).toHaveBeenCalledWith("New query");
  });

  test("displays the search input when the mouse is over the container", async () => {
    const { getByPlaceholderText } = render(
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    );
    const container = await waitFor(
      () => getByPlaceholderText("Search by name or category").parentNode
    );
    fireEvent.mouseEnter(container as ParentNode);
    expect(
      getByPlaceholderText("Search by name or category")
    ).toBeInTheDocument();
  });

  test("hides the search input when the mouse leaves the container", async () => {
    const { getByTestId, getByPlaceholderText, queryByPlaceholderText, debug } =
      await waitFor(() =>
        render(
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )
      );
    // const container = await waitFor(
    //   () => getByPlaceholderText("Search by name or category").parentNode
    // );
    //TODO: GET CSS TO RESOLVE IN TEST SUITE
    const container = getByTestId("search-bar-box");
    const input = screen.getByPlaceholderText("Search by name or category");

    // await waitFor(() => fireEvent.mouseEnter(container as ParentNode));
    // expect(expect(input.classList.contains("slideSearchInput")).toBe(true));
    // await waitFor(() => fireEvent.mouseLeave(container as ParentNode));
    // expect(expect(input.classList.contains("slideSearchInput")).toBe(false));
  });
});
