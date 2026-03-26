const hre = require("hardhat");

async function main() {
  const contractAddress = "0xa6F0068DD8EF1D30713328e5D78C740ED3D586d4";
  const tokenId = 0;
  const newTokenURI = "ipfs://bafkreia2n7h3t2y67degldnorw2edeebkyvebbmqhwcf6rtpb2zraksqha";

  const [deployer] = await hre.ethers.getSigners();

  console.log("Updating token URI with account:", deployer.address);

  const contract = await hre.ethers.getContractAt(
    "CarbonSBT",
    contractAddress
  );

  const tx = await contract.updateTokenURI(tokenId, newTokenURI);
  await tx.wait();

  console.log("Token URI updated ✅");
  console.log("Token ID:", tokenId);
  console.log("New URI:", newTokenURI);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});