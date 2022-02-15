import { expect } from "chai";
import { BigNumber } from "ethers/utils";
import { ethers } from "hardhat";
import { requiresWork, proofOfWork } from "../../src/lib/POW";
import { stringToHEX256 } from "../../src/lib/utils";
describe("Horcrux", function () {

  const difficulty = new BigNumber('0x1ffff');
  const abiCreate = [
    "function create(uint256 source, string calldata horcrux )"
  ];

  xit("testing hash", async function() {
    const seed = stringToHEX256("userfrom1233@bigcomp.com1LP#QOlp09=m/44'/60'/0'/60/60");
    const nonce = "d1234a";
    console.log('---nonce',nonce);
    
    console.log('---seed ',seed);
    console.log('OK ---encoder+keccak256', ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['uint','uint'],[seed,'0x'+nonce])));

    const Horcrux = await ethers.getContractFactory("Horcrux");
    const horcrux = await Horcrux.deploy();
    await horcrux.deployed();
    const block = await horcrux.redeem(seed,'0x'+nonce);

  })

  it("create unique wallet from username/password", async function() {
    const seed = stringToHEX256("userfrom1233@bigcomp.com1LP#QOlp09=m/44'/60'/0'/60/60");
    const node = ethers.utils.HDNode.fromSeed(seed);
    const work = requiresWork(seed,difficulty);
    const hash =  ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[seed,'0x'+work[1]]));
    console.log('---seed ',seed);
    console.log('---nonce ',work[1]);
    console.log('---encoder+keccak256',hash);
    console.log('---proof ',proofOfWork(seed,hash,'0x'+work[1]));

  })
  it("sign create vault function", async function() {
    const seed = stringToHEX256("userfrom1233@bigcomp.com1LP#QOlp09=m/44'/60'/0'/60/60");

    const iface = new ethers.utils.Interface(abiCreate);
    const horcrux = "test";
    const nonce = '0x'+requiresWork(seed,difficulty)[1];
    const encoder = ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[seed,nonce])
    const source = ethers.utils.keccak256(encoder);
    const embeded = iface.encodeFunctionData("create", [source,horcrux]);    
    // console.log('---calldata ',encoder);

  })  
  it("create a new horcrux", async function () {
    const Horcrux = await ethers.getContractFactory("Horcrux");
    const horcrux = await Horcrux.deploy();
    await horcrux.deployed();


    const seed = stringToHEX256("userfrom1233@bigcomp.com1LP#QOlp09=m/44'/60'/0'/60/60");
    const node = ethers.utils.HDNode.fromSeed(seed);
    const share = "test";
    const nonce = '0x'+requiresWork(seed,difficulty)[1];
    const hash =  ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[seed,nonce]));

    horcrux.create(hash,share);
    const block = await horcrux.redeem(seed,nonce);
    
    expect(block.toNumber()).to.equal(2);


  });

  xit("create offline transaction ", async function () {
    const Horcrux = await ethers.getContractFactory("Horcrux");
    const horcrux = await Horcrux.deploy();
    await horcrux.deployed();

    //
    // fist account is deployer
    const [deployer, alice, bob] = await ethers.getSigners();


    const seed = stringToHEX256("userfrom1233@bigcomp.com1LP#QOlp09=m/44'/60'/0'/60/60");
    const node = ethers.utils.HDNode.fromSeed(seed);

    const iface = new ethers.utils.Interface(abiCreate);
    const share = "test";
    const nonce = "0x12345";
    const source = ethers.utils.id(seed + nonce);
    const embeded = iface.encodeFunctionData("create", [source, share]);

    

    const tx = await alice.sendTransaction({
      to: horcrux.address,
      value: ethers.utils.parseEther("0.0"),
      data:embeded
    });    
    
    console.log('---tx ',tx.hash,tx.from);

  });  
});
