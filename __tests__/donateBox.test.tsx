import React from "react";
import { CrowdfundWithMeta } from "../src/types";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Optional, for additional testing utilities

import DonateBox from "../src/components/donateBox";
import { prepareSendTransaction, sendTransaction } from "@wagmi/core";

jest.mock("@wagmi/core", () => ({
  prepareSendTransaction: jest.fn(),
  sendTransaction: jest.fn(),
}));

describe("DonateBox", function () {
  const mockCrowdfund = {
    crowdfundContract: "0x123456789",
  };

  test("updates contribution value when input is changed", () => {
    render(<DonateBox crowdfund={mockCrowdfund as CrowdfundWithMeta} />);
    const input = screen.getByTestId("donate-input");

    fireEvent.change(input, { target: { value: "10" } });
    expect(input).toHaveValue(10);
  });

  //   test("calls donate function when Donate button is clicked", async () => {
  //     //jest.spyOn(console, "log").mockImplementation(() => {});
  //     const mockPrepareSendTransaction =
  //       prepareSendTransaction as jest.MockedFunction<
  //         typeof prepareSendTransaction
  //       >;
  //     const mockSendTransaction = sendTransaction as jest.MockedFunction<
  //       typeof sendTransaction
  //     >;
  //     // Mock prepareSendTransaction and sendTransaction to resolve
  //     mockPrepareSendTransaction.mockResolvedValue({
  //       config: "config",
  //     } as any);
  //     mockSendTransaction.mockResolvedValue({
  //       hash: "0x-transaction hash",
  //     } as any);

  //     render(<DonateBox crowdfund={mockCrowdfund as CrowdfundWithMeta} />);
  //     const input = screen.getByTestId("donate-input");
  //     const donateButton = screen.getByRole("button", { name: "Donate" });

  //     fireEvent.change(input, { target: { value: "123" } });
  //     expect(input).toHaveValue(123);
  //     fireEvent.click(donateButton);

  //     await waitFor(() => {
  //       expect(mockPrepareSendTransaction).toHaveBeenCalledTimes(1);
  //       expect(mockSendTransaction).toHaveBeenCalledTimes(1);
  //       expect(console.log).toHaveBeenCalledWith("0x-transaction hash", "transaction hash");
  //     });
  //   });
});
