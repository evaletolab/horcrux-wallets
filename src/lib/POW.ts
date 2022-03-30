import { BigNumber, ethers } from 'ethers';

// const defaultDifficulty = new BigNumber('0xfff')



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