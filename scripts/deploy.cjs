const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying with account:", deployer.address);

  const Contract = await hre.ethers.getContractFactory("CarbonSBT");
  const contract = await Contract.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("CarbonSBT deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});