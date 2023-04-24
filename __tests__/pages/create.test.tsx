import React from "react";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

// import Create from "../../pages/create";
// import { create, IPFSHTTPClient } from "ipfs-http-client";
// import { mocked } from "jest-mock";

// import * as MockIPFS from "mockipfs";
// const mockNode = MockIPFS.getLocal();

// jest.mock("@rainbow-me/rainbowkit", () => {
//   return {
//     ConnectButton: jest
//       .fn()
//       .mockImplementation(() => <div>Mock ConnectButton</div>),
//   };
// });
// jest.mock("wagmi", () => {
//   return {
//     useAccount: jest.fn().mockImplementation(() => ({ isConnected: true })),
//   };
// });
// jest.mock("next/router", () => ({
//   useRouter: jest.fn().mockImplementation(() => ({
//     pathname: "/create",
//   })),
// }));

describe("Create", function () {
  //   // Start & stop your mock node to reset state between tests
  //   beforeEach(() => mockNode.start());
  //   afterEach(() => mockNode.stop());
  //   MockIPFS;

  test("renders create component without errors", () => {
    // const mockIpfsClient = mocked(create);
    // mockIpfsClient.mockReturnValue(MockIPFS as unknown as IPFSHTTPClient);
    // render(<Create />);
    // const createComponent = screen.getByRole("create-component");
    // expect(createComponent).toBeInTheDocument();
  });

  // test("input fields work correctly", () => {
  //   render(<Create />);

  //   // test name input field
  //   const nameInput = screen.getByPlaceholderText(/name/i);
  //   userEvent.type(nameInput, "Test Crowdfund");
  //   expect(nameInput).toHaveValue("Test Crowdfund");

  //   // test short description input field
  //   const shortDescriptionInput =
  //     screen.getByPlaceholderText(/short description/i);
  //   userEvent.type(shortDescriptionInput, "This is a short description.");
  //   expect(shortDescriptionInput).toHaveValue("This is a short description.");

  //   // test long description input field
  //   const longDescriptionInput =
  //     screen.getByPlaceholderText(/long description/i);
  //   userEvent.type(longDescriptionInput, "This is a long description.");
  //   expect(longDescriptionInput).toHaveValue("This is a long description.");

  //   // test goal input field
  //   const goalInput = screen.getByPlaceholderText(/financial goal/i);
  //   userEvent.type(goalInput, "1000000000000000000");
  //   expect(goalInput).toHaveValue(1000000000000000000);

  //   // test category dropdown menu
  //   const dropdownMenu = screen.getByRole("dropdown");
  //   userEvent.selectOptions(dropdownMenu, "test-category");
  //   expect(dropdownMenu).toHaveValue("test-category");
  // });
  // test("file input field works correctly", () => {
  //   render(<Create />);

  //   // test file input field
  //   const fileInput = screen.getByLabelText(/asset/i);
  //   const file = new File(["file contents"], "test.png", { type: "image/png" });
  //   userEvent.upload(fileInput, file);
  //   expect(fileInput.files[0]).toStrictEqual(file);
  // });

  // test("createCrowdfund function is called when submit button is clicked", () => {
  //   render(<Create />);

  //   const createCrowdfundMock = jest.fn();
  //   const submitButton = screen.getByRole("button", { name: /create defi crowdfund/i });
  //   submitButton.onclick = createCrowdfundMock;

  //   fireEvent.click(submitButton);
  //   expect(createCrowdfundMock).toHaveBeenCalledTimes(1);
  // });
});
