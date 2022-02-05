pragma solidity ^0.8.10;
// SPDX-License-Identifier: MIT


contract Horcrux {
  mapping (uint256 => uint256) public index;

  // (to be validated)
  // using log instead memory to preserve gas cost 
  event Vault(uint256 sender, uint block, bytes horcrux);

  //
  // source hash of the encryptor address
  // horcrux content is the encrypted shamir secret part
  function create(uint256 source, bytes calldata horcrux ) external {
    index[(source)] = block.number;
    emit Vault(source,block.number,horcrux);
  }

  //
  // source is the obfuscated hash of encryptor address
  // it should return the encryption data that belongs to the source address
  function redeem(uint256 source) external view returns(bytes32 horcrux) {
    return blockhash(index[source]);
  }
}

