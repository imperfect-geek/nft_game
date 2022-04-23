// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LipToken is ERC721, Ownable {
    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    uint256 fee = 0.1 ether;
    uint256 COUNTER;
    struct Lip {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
    }
    Lip[] public lips;

    event NewLip(address owner, uint256 id, uint256 dna);

    //Helpers
    function _createRandomNumber(uint256 _mod) internal view returns (uint256) {
        uint256 randNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );
        return randNumber % _mod;
    }

    function updateFee(uint256 _fee) external onlyOwner {
        fee = _fee * (1 ether);
    }

    function withDraw() external onlyOwner {
        address _owner = owner();
        payable(_owner).transfer(address(this).balance);
    }

    //Creations
    function _createLip(string memory _name) internal {
        uint8 _rarity = uint8(_createRandomNumber(100));
        uint256 _dna = _createRandomNumber(10**16);
        Lip memory newLip = Lip(_name, COUNTER, _dna, 1, _rarity);
        lips.push(newLip);
        _safeMint(msg.sender, COUNTER);
        emit NewLip(msg.sender, COUNTER, _dna);
        COUNTER++;
    }

    function createRandomLip(string memory _name) public payable {
        require(msg.value == fee, "Fee is not as required!");
        _createLip(_name);
    }

    //Getters
    function getLips() public view returns (Lip[] memory) {
        return lips;
    }

    function getOwnerLips(address _owner) public view returns (Lip[] memory) {
        Lip[] memory result = new Lip[](balanceOf(_owner));
        uint256 counter = 0;
        for (uint256 i = 0; i < lips.length; i++) {
            if (ownerOf(i) == _owner) {
                result[counter] = lips[i];
                counter++;
            }
        }
        return result;
    }

    //Actions
    function levelUp(uint256 _lipId) public {
        require(ownerOf(_lipId) == msg.sender, "Only NFT owners can level up.");
        Lip storage lip = lips[_lipId];
        lip.level++;
    }
}
