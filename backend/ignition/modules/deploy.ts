const hre = require("hardhat");

async function main() {
  // Load the NFT contract artifacts
  const ourNFTContract = await hre.ethers.getContractFactory("OurNFT");

  const NFTDeployed = await ourNFTContract.deploy();

  // Wait and Deploy the contract
   await NFTDeployed.waitForDeployment();

  // Get NFTContract Hash
  // console.log("\nTransaction hash:", nftHash);
  console.log("Waiting for confirmations...");

  // Print the address of the NFT contract
  console.log("NFT Contract deployed to:", NFTDeployed.target);

  // // Load the marketplace contract artifacts
  // const NFTMarketplaceContract = await hre.ethers.deployContract(
  //   "NFTMarketplace"
  // );

  // // Wait and Deploy the contract
  // const NFTMarketplaceHash = await NFTMarketplaceContract.waitForDeployment();

  // // Get NFTMarketPlace Contract Hash
  // console.log("\nNFTMarketplace Transaction hash:", NFTMarketplaceHash);
  // console.log("Waiting for confirmations...");

  // // Log the address of the new contract
  // console.log("NFT Marketplace deployed to:", NFTMarketplaceContract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
