import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { requiresWork, proofOfWork } from "../../src/lib/POW";
import { stringToHEX256 } from "../../src/lib/utils";
describe("Horcrux", function () {

  const difficulty = BigNumber.from('0xffff');
  const abiCreate = [
    "function create(uint256 source, string calldata horcrux )"
  ];


  it("create unique seed based on username/password", async function() {
    const seed = stringToHEX256("userfrom1233@bigcomp.com12LP#QOlp09");
    const work = requiresWork(seed,difficulty);
    const hash =  ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[seed,'0x'+work[1]]));
    // console.log('---seed ',seed);
    // console.log('---nonce ',work[1]);
    // console.log('---encoder+keccak256',hash);
    //console.log('---proof ',proofOfWork(seed,hash,'0x'+work[1]));
    const pow = proofOfWork(seed,hash,'0x'+work[1]);
    expect(pow).to.be.true;
  })

  it("create a new horcrux", async function () {
    const Horcrux = await ethers.getContractFactory("Horcrux");
    const horcrux = await Horcrux.deploy();
    await horcrux.deployed();


    const seed = stringToHEX256("userfrom1233@bigcomp.com1LP#QOlp09");
    const node = ethers.utils.HDNode.fromSeed(seed);
    const share = "test";
    const nonce = '0x'+requiresWork(seed,difficulty)[1];
    const hash =  ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[seed,nonce]));

    await horcrux.create(hash,share);
    const block = await horcrux.redeem(seed,nonce);
    
    expect(block.toNumber()).to.equal(2);
  });


  it("produce offline Vault function", async function() {
    const seed = stringToHEX256("userfrom1233@bigcomp.com1LP#QOlp09");

    const iface = new ethers.utils.Interface(abiCreate);
    const horcrux = "test";
    const nonce = '0x'+requiresWork(seed,difficulty)[1];
    const encoder = ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[seed,nonce])
    const source = ethers.utils.keccak256(encoder);
    const embeded = iface.encodeFunctionData("create", [source,horcrux]);    
    // console.log('---calldata ',encoder);
    expect(embeded).to.be.a.string;

  })  

});
