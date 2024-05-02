import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const LockModule = buildModule("NFTMarketPlace", (m) => {

  const lock = m.contract("NFTMarketPlace");

  return { lock };
});

export default LockModule;
