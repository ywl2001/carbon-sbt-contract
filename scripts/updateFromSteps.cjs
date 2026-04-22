const hre = require("hardhat");

function calculateScore(steps) {
  return Math.min(Math.floor(steps / 1000), 10);
}

function calculateLevel(score) {
  if (score <= 3) return 1;
  if (score <= 7) return 2;
  return 3;
}

async function main() {
  const contractAddress = "0xc4b771441f21b4e81454eD079edfD3b0503FFa2E";
  const userAddress = "0xdd889a2b6AD69E387b6D1719813d8b01058640fc";

  const steps = 9200;

  const score = calculateScore(steps);
  const level = calculateLevel(score);

  const newMetadataURI = "ipfs://bafkreia2n7h3t2y67degldnorw2edeebkyvebbmqhwcf6rtpb2zraksqha";

  const [deployer] = await hre.ethers.getSigners();

  console.log("Updating from steps with account:", deployer.address);
  console.log("Steps:", steps);
  console.log("Calculated score:", score);
  console.log("Calculated level:", level);

  const contract = await hre.ethers.getContractAt(
    "CarbonSBT",
    contractAddress
  );

  const tx = await contract.updateCarbonData(
    userAddress,
    score,
    level,
    newMetadataURI
  );

  await tx.wait();

  console.log("Carbon data updated from steps ✅");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});