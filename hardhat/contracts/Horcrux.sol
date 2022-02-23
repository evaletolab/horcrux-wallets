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
  event Vault(uint block, uint256 horcrux);

  constructor() {
  }

  //
  // Source is the destination place of the Horcrux
  // Horcrux is the encrypted shamir secret part
  function create(uint256 source, uint256 horcrux ) external {
    require(index[source] == 0,"Horcrux: this destination is not available"); // cost 47 gas
    index[(source)] = horcrux;
    emit Vault(block.number,horcrux);
  }

  //
  // The Seed and the Nonce are elements that becomes the destination place of the Horcrux
  function redeem(uint256 seed, uint256 nonce) external view returns(uint256) {
    uint256 source =uint256(keccak256(abi.encodePacked(seed,nonce)));
    return (index[source]);
  }
}

