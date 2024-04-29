import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity:{
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks:{
    arbitrumSepolia: {
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      chainId: 421614,
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
  }
  
};

export default config;