import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { requiresWork, proofOfWork } from "../../src/lib/POW";
import { stringToHEX256 } from "../../src/lib/utils";
import { xor_encrypt, xor_decrypt } from "../../src/lib/XOR";
describe("Horcrux", function () {

  const difficulty = BigNumber.from('0xafff');
  const abiCreate = [
    "function create(uint256 source, string calldata  horcrux )"
  ];


  it("create unique seed based on username/password", async function() {
    const seed = stringToHEX256("userfrom1233@bigcomp.com12LP#QOlp09");
    const work = requiresWork(seed,difficulty);
    const hash =  ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[seed,'0x'+work[1]]));
    console.log('---seed ',seed);
    console.log('---nonce ',work[1]);
    // console.log('---encoder+keccak256',hash);
    //console.log('---proof ',proofOfWork(seed,hash,'0x'+work[1]));
    const pow = proofOfWork(seed,hash,'0x'+work[1]);
    expect(pow).to.be.true;
  })

  it("mix and unmix (XOR) buffer data", async function () {
    const pkey ="0xc2cdaf9afe1289a5545326e2";
    const share = "0x0801fde48137222a357d4a70db809ae103aae7864b2312ab448a9301df635ea8020b";

    //
    // simple mixer
    let bytes = xor_encrypt(
      ethers.utils.arrayify(share),
      ethers.utils.arrayify(pkey)
    );
    const mixed = ethers.utils.hexlify(bytes);

    //
    // simple demixer
    bytes = xor_decrypt(
      ethers.utils.arrayify(mixed),
      ethers.utils.arrayify(pkey)
    );
    const unmixed = ethers.utils.hexlify(bytes);

    expect(share).to.equal(unmixed);

  })

  it("create a new horcrux", async function () {
    const Horcrux = await ethers.getContractFactory("Horcrux");
    const horcrux = await Horcrux.deploy();
    await horcrux.deployed();


    const seed = stringToHEX256("userfrom1233@bigcomp.com1LP#QOlp09");
    const node = ethers.utils.HDNode.fromSeed(seed);
    const share = "0x0801fde48137222a357d4a70db809ae103aae7864b2312ab448a9301df635ea8020b";
    const nonce = '0x'+requiresWork(seed,difficulty)[1];
    const hash =  ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[seed,nonce]));

    
    //
    // simple mixer
    let bytes = xor_encrypt(
      ethers.utils.arrayify(share),
      ethers.utils.arrayify(node.privateKey.substring(0,16))
    );
    const mixed = ethers.utils.hexlify(bytes);
    

    await horcrux.create(hash,mixed);
    const result = await horcrux.redeem(seed,nonce);

    //
    // simple demixer
    bytes = xor_decrypt(
      ethers.utils.arrayify(result),
      ethers.utils.arrayify(node.privateKey.substring(0,16))
    );
    const unmixed = ethers.utils.hexlify(bytes);


    expect(share).to.equal(unmixed);
  });
  


  it("produce offline Vault function", async function() {
    const seed = stringToHEX256("userfrom1233@bigcomp.com1LP#QOlp09");

    const iface = new ethers.utils.Interface(abiCreate);
    const share = "0x801fde48137222a357d4a70db809ae103aae7864b2312ab448a9301df635ea8020b";
    const nonce = '0x'+requiresWork(seed,difficulty)[1];
    const encoder = ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[seed,nonce])
    const source = ethers.utils.keccak256(encoder);
    const embeded = iface.encodeFunctionData("create", [source,share]);    
    // console.log('---calldata ',encoder);
    expect(embeded).to.be.a.string;

  })  

});
