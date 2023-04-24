import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DropdownMenu from "../src/components/customDropdown";

describe("DropdownMenu", () => {
  it("should set the category value when an option is selected", () => {
    const setFormInputMock = jest.fn();
    const formInputMock = {
      name: "Test",
      descriptionShort: "Test",
      descriptionLong: "Test",
      goal: 100,
      category: "",
    };

    const { getByLabelText } = render(
      <DropdownMenu setFormInput={setFormInputMock} formInput={formInputMock} />
    );

    const dropdown = screen.getByDisplayValue("Select Category");
    fireEvent.change(dropdown, {
      target: { value: "Children" },
    });

    expect(setFormInputMock).toHaveBeenCalledWith({
      ...formInputMock,
      category: "Children",
    });
  });
});
