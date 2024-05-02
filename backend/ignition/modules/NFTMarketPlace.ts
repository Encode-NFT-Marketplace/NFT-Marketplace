

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";



const NFTMarketPlaceModule = buildModule("NFTMarketPlac", (m) => {
 
  const nftmarketplace = m.contract("NFTMarketPlace");

  return { nftmarketplace };
});

export default NFTMarketPlaceModule;
