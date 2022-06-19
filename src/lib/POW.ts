import { BigNumber, ethers } from 'ethers';

// const defaultDifficulty = new BigNumber('0xfff')


//
// FIXME, use scrypt (or AES-js) instead ! 
// https://github.com/ethers-io/ethers.js/blob/564c5fa36458683571f94806b7563a6e2e695ab0/wallet/secret-storage.js#L230
// https://www.npmjs.com/package/aes-js
export function requiresWork(string: string, difficulty: BigNumber) {
  for (let index = 0;; index++) {
    const work = BigNumber.from(ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['uint','uint'],[string,index])));
    // if(work.mod(defaultDifficulty).eq(0)) {
    //   console.log('---',index,work.toString())
    // }
    if((work.mod(difficulty)).lte(2)) {
      return [work.toHexString(),'0x'+index.toString(16)];
    }    

  }
}

export function proofOfWork(string: string, hash: string, nonce: string) {
  const pow = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['uint','uint'],[string,nonce]));
  return (BigNumber.from(hash).eq(pow));
}