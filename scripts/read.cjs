const hre = require("hardhat");

async function main() {
  const contractAddress = "0xc4b771441f21b4e81454eD079edfD3b0503FFa2E";
  const userAddress = "0xdd889a2b6AD69E387b6D1719813d8b01058640fc";

  const contract = await hre.ethers.getContractAt(
    "CarbonSBT",
    contractAddress
  );

  const tokenId = await contract.getTokenIdByOwner(userAddress);
  const score = await contract.getScore(userAddress);
  const level = await contract.getLevel(userAddress);
  const tokenURI = await contract.tokenURI(tokenId);

  console.log("User:", userAddress);
  console.log("Token ID:", tokenId.toString());
  console.log("Score:", score.toString());
  console.log("Level:", level.toString());
  console.log("Token URI:", tokenURI);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});