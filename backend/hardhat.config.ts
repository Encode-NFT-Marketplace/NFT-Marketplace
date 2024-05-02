import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import * as dotenv from "dotenv";
dotenv.config();

// imports Alchemy API key and metamask private key
const { CELO_PRIVATE_KEY, METAMASK_PRIVATE_KEY, ALCHEMY_ETH_SEPOLIA_API_KEY, ALCHEMY_ARBITRUM_SEPOLIA_API_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_ETH_SEPOLIA_API_KEY}`,
      chainId: 11155111,
      accounts: [`${METAMASK_PRIVATE_KEY}`],
    },
    arbitrumSepolia: {
      url: `https://arb-sepolia.g.alchemy.com/v2/${ALCHEMY_ARBITRUM_SEPOLIA_API_KEY}`,
      chainId: 421614,
      accounts: [`${METAMASK_PRIVATE_KEY}`],
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [`${METAMASK_PRIVATE_KEY}`],
      chainId: 44787,
    },
  },
};

export default config;
