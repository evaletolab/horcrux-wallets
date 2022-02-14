import { BigNumber, id } from 'ethers/utils';

const defaultDifficulty = new BigNumber('0xfff')

export function requiresWork(string: string, difficulty: BigNumber) {
  for (let index = 0;; index++) {
    const work = new BigNumber(id(string+index));
    // if(work.mod(defaultDifficulty).eq(0)) {
    //   console.log('---',index,work.toString())
    // }
    if((work.mod(difficulty)).lte(2)) {
      return [work.toString(),index.toString()];
    }    

  }
}

export function proofOfWork(string: string, hash: string, nonce: string) {
  const pow = id(string+nonce);
  return (new BigNumber(hash).eq(pow));
}