// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract OurNFT is ERC721 {

    constructor() ERC721("Group10", "G10") {
        s_tokenCounter = 0;
    }
    string public constant TOKEN_URI = "";
    uint256 private s_tokenCounter;

    event G10Minted(uint256 indexed tokenId);

    function mintNft() public {
        _mint(msg.sender, s_tokenCounter);
        emit G10Minted(s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "ERC721Metadata: URI query for nonexistent token");
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}