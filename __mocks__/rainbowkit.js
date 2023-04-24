import React from "react";

export const mockRainbowkit = {
  ConnectButton: jest
    .fn()
    .mockImplementation(() => <div>Mock ConnectButton</div>),
};
