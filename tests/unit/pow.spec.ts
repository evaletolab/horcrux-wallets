import { expect } from 'chai'
import { proofOfWork, requiresWork } from '@/lib/POW'
import { BigNumber } from 'ethers/utils';

describe('POW', () => {
  const difficulty = new BigNumber('0x7ffff');
  it('generate pow from medium string', () => {
    const msg = 'new message as pow seed';
    const work = requiresWork(msg,difficulty);
    expect(work).to.exist;

    const exist = proofOfWork(msg,work[0],work[1]);
    expect(exist).to.be.true;
    
  })
})
