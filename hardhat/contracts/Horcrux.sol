pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

// import "hardhat/console.sol";

// FIXME use upgrade contracts
// https://docs.openzeppelin.com/learn/upgrading-smart-contracts
// https://medium.com/coinmonks/upgrading-smart-contracts-with-openzeppelin-upgrades-plugins-in-typescript-hardhat-dd5ca6d01585
contract Horcrux {
  mapping (uint256 => uint256) public index;


  // (to be validated)
  // using log instead memory to preserve gas cost 
  event Vault(uint block, string horcrux);

  constructor() {
  }

  //
  // source hash of the encryptor address
  // horcrux content is the encrypted shamir secret part
  // The Nonce is a random whole number that becomes a valid number to be used for hashing the value
  function create(uint256 source, string calldata horcrux ) external {
    index[(source)] = block.number;
    emit Vault(block.number,horcrux);
  }

  //
  // source is the obfuscated hash of encryptor address
  // it should return the encryption data that belongs to the source address
  function redeem(uint256 seed, uint256 nonce) external view returns(uint256) {
    uint256 source =uint256(keccak256(abi.encodePacked(seed,nonce)));
    return (index[source]);
  }
}

