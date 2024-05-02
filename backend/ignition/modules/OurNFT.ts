

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";



const OurNFTModule = buildModule("OurNFT", (m) => {


  const ournft = m.contract("OurNFT");

  return { ournft };
});

export default OurNFTModule;
