type rpcUrl = {
  rpcUrl: string;
  chainId: number;
};
export const chainIdMap = {
  1: process.env.MAINNET_HTTPS_URL,
  11155111: process.env.SEPOLIA_HTTPS_URL,
  17000: process.env.HOLESKY_HTTPS_URL,
  56: process.env.BSC_HTTPS_URL,
  1337: process.env.NEXT_PUBLIC_GANACHE_TEST_RPC_URL!,
};
