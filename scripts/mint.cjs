const hre = require("hardhat");

async function main() {
  const contractAddress = "0xa6F0068DD8EF1D30713328e5D78C740ED3D586d4";

  const [deployer] = await hre.ethers.getSigners();

  console.log("Minting with account:", deployer.address);

  const contract = await hre.ethers.getContractAt(
    "CarbonSBT",
    contractAddress
  );

  const to = deployer.address;
  const tokenURI = "ipfs://your-carbon-metadata";
  const level = 1;

  const tx = await contract.mint(to, tokenURI, level);
  await tx.wait();

  console.log("SBT Minted ✅");
  console.log("Owner:", to);
  console.log("Level:", level);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});