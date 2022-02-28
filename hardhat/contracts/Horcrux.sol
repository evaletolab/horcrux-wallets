pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

// import "hardhat/console.sol";

// FIXME use upgrade contracts
// https://docs.openzeppelin.com/learn/upgrading-smart-contracts
// https://medium.com/coinmonks/upgrading-smart-contracts-with-openzeppelin-upgrades-plugins-in-typescript-hardhat-dd5ca6d01585
contract Horcrux {
  mapping (uint256 => string) public index;


  // (to be validated)
  // using log instead memory to preserve gas cost 
  event Vault(uint block, string horcrux);

  constructor() {
  }

  //
  // Source is the destination place of the Horcrux
  // Horcrux is the encrypted shamir secret part
  function create(uint256 source, string calldata horcrux ) external isWallet {
    require(bytes(index[source]).length == 0 ,"Horcrux: this destination is not available"); // cost 47 gas
    index[(source)] = horcrux;
    emit Vault(block.number,horcrux);
  }

  //
  // The Seed and the Nonce are elements that becomes the destination place of the Horcrux
  function redeem(uint256 seed, uint256 nonce) external view isWallet returns(string memory) {
    uint256 source =uint256(keccak256(abi.encodePacked(seed,nonce)));
    return (index[source]);
  }

  //
  // fallback is mandatory to exec relayer
  fallback() external isWallet{   
  }  

  modifier isWallet() {
    uint x;
    // This opcode returns the size of the code on an address. If the size is larger than zero, the address is a contract
    // https://ethereum.stackexchange.com/questions/45095/how-could-msg-sender-tx-origin-and-extcodesizecaller-0-be-true/45111
    assembly { x := extcodesize(caller()) }
    require(x == 0);
    _;
  }
}

