import React from "react";
import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Optional, for additional testing utilities

import Menu from "../src/components/menu";

describe("Menu", function () {

  test("renders the menu when prop is true", () => {
    let menuState = true;
    const setMenuState = jest.fn((newState) => {
      menuState = newState;
    });

    render(<Menu setMenuState={setMenuState} menuState={menuState} />);

    // Assert that the menu items are rendered
    expect(screen.getByText("Find places to give.")).toBeInTheDocument();
    expect(
      screen.getByText("Create a new funding project.")
    ).toBeInTheDocument();
    expect(screen.getByText("My funding projects.")).toBeInTheDocument();
    expect(
      screen.getByText("Funding project's i support.")
    ).toBeInTheDocument();

    // Assert that the close icon is rendered
    expect(screen.getByTestId("close-icon")).toBeInTheDocument();

    // // Assert that the close icon has the correct icon prop
    const closeIcon = screen.getByTestId("close-icon");

    // Simulate click on close icon
    fireEvent.click(closeIcon);

    // Assert that setMenuState is called with the expected value
    expect(setMenuState).toHaveBeenCalledTimes(1);
    expect(setMenuState).toHaveBeenCalledWith(false);
  });
});
