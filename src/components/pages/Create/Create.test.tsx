import React from "react";
import { render, screen } from '@testing-library/react';
//import { describe, expect, test } from "@jest/globals";
import Create from "./Create";

describe("Create Page", function () {
  test("renders create page", () => {
    render(<Create />);
    const form = screen.getByPlaceholderText(/name/i);
    expect(form).toBeInTheDocument();
  });
});
