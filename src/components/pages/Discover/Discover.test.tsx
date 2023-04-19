import React from "react";
//@ts-ignore
import { render, screen } from "@testing-library/react";
import { expect } from "chai";

//import { describe, expect, test } from "@jest/globals";
import Discover from "./Discover";

describe("Create Page", function () {
  test("renders create page", () => {
    render(<Discover />);

    const heading = screen.getByText(/No Crowdfunds in this marketplace./i);
    expect(heading).to.be.not.null;
  });
});
