const hre = require("hardhat");
const axios = require("axios");

function calculateScore(steps) {
  return Math.min(Math.floor(steps / 1000), 10);
}

function calculateLevel(score) {
  if (score <= 3) return { level: 1, label: "Seed" };
  if (score <= 7) return { level: 2, label: "Green" };
  return { level: 3, label: "Pro" };
}

async function uploadToIPFS(metadata) {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  const res = await axios.post(url, metadata, {
    headers: {
      pinata_api_key: "e22797a6473315e9d837",
      pinata_secret_api_key: "16c18df7d0a087a42445de52e8992284f51bf2f87cd1c1ced78e262136be0889",
    },
  });

  return `ipfs://${res.data.IpfsHash}`;
}

async function main() {
  const contractAddress = "0xc4b771441f21b4e81454eD079edfD3b0503FFa2E";
  const userAddress = "0xdd889a2b6AD69E387b6D1719813d8b01058640fc";

  const steps = 7500;

  const score = calculateScore(steps);
  const levelData = calculateLevel(score);

  console.log("Steps:", steps);
  console.log("Score:", score);
  console.log("Level:", levelData.label);

  // 🔥 動態產 metadata
  const metadata = {
    name: "Carbon Identity",
    description: "Dynamic Carbon Identity",
    image: "https://via.placeholder.com/300",
    attributes: [
      {
        trait_type: "Carbon Score",
        value: score,
      },
      {
        trait_type: "Level",
        value: levelData.label,
      },
      {
        trait_type: "Steps",
        value: steps,
      },
    ],
  };

  console.log("Uploading metadata to IPFS...");

  const metadataURI = await uploadToIPFS(metadata);

  console.log("New Metadata URI:", metadataURI);

  const contract = await hre.ethers.getContractAt(
    "CarbonSBT",
    contractAddress
  );

  const tx = await contract.updateCarbonData(
    userAddress,
    score,
    levelData.level,
    metadataURI
  );

  await tx.wait();

  console.log("Carbon SBT updated with dynamic metadata ✅");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});