import React from "react";
//@ts-ignore
import { render, screen } from "@testing-library/react";
import { expect } from "chai";

//import { describe, expect, test } from "@jest/globals";
import Create from "./Create";

describe("Create Page", function () {
  test("renders create page", () => {
    render(<Create />);

    const form = screen.getByPlaceholderText(/name/i);
    expect(form).to.be.not.null;
  });
});
