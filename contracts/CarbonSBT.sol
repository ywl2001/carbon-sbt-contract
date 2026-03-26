// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonSBT is ERC721, Ownable {
    uint256 private _nextTokenId;

    mapping(address => bool) public hasMinted;
    mapping(address => uint256) public userLevel;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256) private _ownedTokenId;

    error SoulboundToken();
    error AlreadyMinted();

    constructor() ERC721("Carbon Soulbound Token", "CSBT") {}

    function mint(address to, string memory metadataURI, uint256 level) external onlyOwner {
        if (hasMinted[to]) revert AlreadyMinted();

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(to, tokenId);
        _tokenURIs[tokenId] = metadataURI;
        hasMinted[to] = true;
        userLevel[to] = level;
        _ownedTokenId[to] = tokenId;
    }

    function updateLevel(address user, uint256 newLevel) external onlyOwner {
        require(hasMinted[user], "User has not minted");
        userLevel[user] = newLevel;
    }

    function updateTokenURI(uint256 tokenId, string memory newMetadataURI) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _tokenURIs[tokenId] = newMetadataURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    function getLevel(address user) external view returns (uint256) {
        require(hasMinted[user], "User has not minted");
        return userLevel[user];
    }

    function getTokenIdByOwner(address user) external view returns (uint256) {
        require(hasMinted[user], "User has not minted");
        return _ownedTokenId[user];
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal override {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);

        if (from != address(0) && to != address(0)) {
            revert SoulboundToken();
        }
    }

    function approve(address, uint256) public pure override {
        revert SoulboundToken();
    }

    function setApprovalForAll(address, bool) public pure override {
        revert SoulboundToken();
    }
}