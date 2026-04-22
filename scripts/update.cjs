const hre = require("hardhat");

async function main() {
  const contractAddress = "0xc4b771441f21b4e81454eD079edfD3b0503FFa2E";
  const userAddress = "0xdd889a2b6AD69E387b6D1719813d8b01058640fc";

  const [deployer] = await hre.ethers.getSigners();

  console.log("Updating carbon data with account:", deployer.address);

  const contract = await hre.ethers.getContractAt(
    "CarbonSBT",
    contractAddress
  );

  const newScore = 80;
  const newLevel = 2;

  const newMetadataURI =
    "ipfs://bafkreia2n7h3t2y67degldnorw2edeebkyvebbmqhwcf6rtpb2zraksqha";

  const tx = await contract.updateCarbonData(
    userAddress,
    newScore,
    newLevel,
    newMetadataURI
  );

  await tx.wait();

  console.log("Carbon data updated ✅");
  console.log("User:", userAddress);
  console.log("Score:", newScore);
  console.log("Level:", newLevel);
  console.log("New URI:", newMetadataURI);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});