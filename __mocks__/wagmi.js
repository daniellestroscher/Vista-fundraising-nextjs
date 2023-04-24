export const mockWagmi = {
  useAccount: jest.fn().mockImplementation(() => ({ isConnected: true })),
};