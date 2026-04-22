const hre = require("hardhat");

async function main() {
  const contractAddress = "0xc4b771441f21b4e81454eD079edfD3b0503FFa2E";

  const [deployer] = await hre.ethers.getSigners();

  console.log("Minting with account:", deployer.address);

  const contract = await hre.ethers.getContractAt(
    "CarbonSBT",
    contractAddress
  );

  const to = deployer.address;
  const tokenURI = "ipfs://your-carbon-metadata";
  const initialScore = 10;
  const initialLevel = 1;

  const tx = await contract.mint(
    to,
    tokenURI,
    initialScore,
    initialLevel
  );

  await tx.wait();

  console.log("SBT Minted ✅");
  console.log("Owner:", to);
  console.log("Score:", initialScore);
  console.log("Level:", initialLevel);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});