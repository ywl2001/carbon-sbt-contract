# 🌱 Carbon SBT (Dynamic Carbon Identity)

A dynamic on-chain identity system that transforms real-world carbon behavior into a verifiable, non-transferable blockchain identity.

---

## 🚀 Overview

Carbon SBT (Soulbound Token) is a Web3-based identity system that tracks and represents an individual's carbon-related behavior on-chain.

Unlike traditional NFTs, this token is:

- 🔒 Non-transferable (Soulbound)
- 📈 Dynamically updated
- 🧠 Behavior-driven

> This is not a tradable asset — it is a **verifiable identity layer**.

---

## 🧠 Core Concept

Steps (real-world behavior)
→ Score & Level calculation
→ Metadata generation
→ IPFS storage
→ Smart contract update
→ On-chain identity

This creates a full pipeline from **behavior → data → identity**.

---

## 🧩 Features

### ✅ 1. Soulbound Token (SBT)

- One token per wallet
- Non-transferable
- Represents identity, not ownership

### ✅ 2. Dynamic Identity

- Carbon score updates over time
- Level evolves based on behavior
- Metadata updates accordingly

### ✅ 3. On-chain + Off-chain Hybrid

- On-chain: score, level, ownership
- Off-chain (IPFS): metadata & attributes

### ✅ 4. Behavior-driven Updates

- Input: daily steps
- Auto calculation:
  - Score
  - Level
- Sync to blockchain

---

## 🏗️ Tech Stack


| Layer           | Technology             |
| --------------- | ---------------------- |
| Smart Contract  | Solidity (ERC-721 SBT) |
| Network         | Ethereum (Sepolia)     |
| Storage         | IPFS (via Pinata)      |
| Backend Scripts | Node.js + Hardhat      |
| Web3            | ethers.js              |


---

## 📁 Project Structure

contracts/
CarbonSBT.sol

scripts/
deploy.cjs
mint.cjs
update.cjs
read.cjs
updateFromSteps.cjs
updateWithMetadata.cjs

metadata/
template.carbon.json

---

## ⚙️ Smart Contract Functions

```solidity
mint(address, metadataURI, initialScore, initialLevel)
updateCarbonData(address, score, level, metadataURI)
getScore(address)
getLevel(address)
getTokenIdByOwner(address)
tokenURI(tokenId)
```

---

## 🔁 Workflow

1. Deploy Contract

npx hardhat run scripts/deploy.cjs --network sepolia
2. Mint SBT
npx hardhat run scripts/mint.cjs --network sepolia
3. Update from Behavior
npx hardhat run scripts/updateWithMetadata.cjs --network sepolia
4. Read Identity
npx hardhat run scripts/read.cjs --network sepolia

---

## 📊 Example Metadata

{
  "name": "Carbon Identity",
  "description": "Dynamic Carbon Identity",
  "attributes": [
    { "trait_type": "Carbon Score", "value": 7 },
    { "trait_type": "Level", "value": "Green" },
    { "trait_type": "Steps", "value": 7500 }
  ]
}

---

## 🌍 Use Cases

ESG identity layer
Sustainable lifestyle tracking
Green membership systems
On-chain reputation systems
Future DeFi risk scoring (based on behavior)

---

## 🔮 Future Improvements

🔗 Real data integration (Apple Health / Google Fit)
🔐 Verifiable data via oracle / ZK proof
🎁 Reward system (discounts / perks)
🌐 Frontend UI for real-time interaction
🏦 Integration with financial systems

---

## 🎯 Project Status

✅ Dynamic Carbon Identity MVP completed

The system successfully demonstrates:

Behavior → Identity mapping
On-chain dynamic updates
IPFS metadata synchronization

---

## 💡 Key Insight

This project explores a new paradigm:

Identity is defined by behavior, not assets.

---

## 👤 Author

Nina
Blockchain / ESG / Identity Systems