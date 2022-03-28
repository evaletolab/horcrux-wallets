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
    const share = "0x0801ac30b898476dfb96b65ba8ce36eac7b07d3f0ad18c970eb7b49381c6";

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
    const share = "0x0801ac30b898476dfb96b65ba8ce36eac7b07d3f0ad18c970eb7b49381c6";
    const nonce = '0x'+requiresWork(seed,difficulty)[1];
    const privateKey =  ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[seed,nonce]));
    const hash = ethers.utils.keccak256(privateKey);

    
    //
    // simple mixer
    let bytes = xor_encrypt(
      ethers.utils.arrayify(share),
      ethers.utils.arrayify(privateKey.substring(0,16))
    );
    const mixed = ethers.utils.hexlify(bytes);
    

    await horcrux.create(hash,mixed);
    const result = await horcrux.redeem(seed,nonce);

    //
    // simple demixer
    bytes = xor_decrypt(
      ethers.utils.arrayify(result),
      ethers.utils.arrayify(privateKey.substring(0,16))
    );
    const unmixed = ethers.utils.hexlify(bytes);


    expect(share).to.equal(unmixed);
  });
  


  // https://opengsn.org/
  // https://github.com/bitclave/Feeless
  // https://www.freecodecamp.org/news/universal-ethereum-delegated-transactions-no-more-ethereum-fees/
  xit("understanding of delegate transaction", async function() {
    this.timeout(70000);

    const seed = stringToHEX256("userfrom1233@bigcomp.com1LP#QOlp09");

    const iface = new ethers.utils.Interface(abiCreate);
    const share = "0x0801ac30b898476dfb96b65ba8ce36eac7b07d3f0ad18c970eb7b49381c6";
    const nonce = '0x'+requiresWork(seed,difficulty)[1];
    const encoder = ethers.utils.defaultAbiCoder.encode(['uint256','uint256'],[seed,nonce])
    const source = ethers.utils.keccak256(encoder);
    const encoded = iface.encodeFunctionData("create", [source,share]);    
    //console.log('---calldata ',encoded);
    expect(encoded).to.be.a.string;

    //
    // get contract address
    const Horcrux = await ethers.getContractFactory("Horcrux");
    const horcrux = await Horcrux.deploy();
    await horcrux.deployed();

    //
    // sign transaction 
    const node = ethers.utils.HDNode.fromSeed(source);



    const [deployer, alice, bob] = await ethers.getSigners();

    const signer = new ethers.Wallet(node.privateKey);
    const txRequest = await horcrux.populateTransaction.create(source,share);
    txRequest.from=node.address;
    txRequest.value= ethers.utils.parseEther("0.0");
    txRequest.gasLimit= BigNumber.from('210000');


    const encodedtx1 = await signer.signTransaction(txRequest);
    const encodedtx2 = await signer.signTransaction({
      from:node.address,
      to: horcrux.address,
      value: ethers.utils.parseEther("0.0"),
      gasLimit: BigNumber.from('210000'),
      data:encoded,
      chainId:1
    })
    console.log('----1',encodedtx1)
    console.log('----2',encodedtx2)

    //
    // TODO https://github.com/status-im/account-contracts/blob/develop/contracts/account/AccountGasAbstract.sol
    // const provider = await ethers.getDefaultProvider('homestead');

    const tx = await ethers.provider.sendTransaction(encodedtx1);
    // const receipt = await provider.getTransactionReceipt(tx.hash);

    // const tx = await alice.sendTransaction({
    //   from:alice.address,
    //   to: horcrux.address,
    //   value: ethers.utils.parseEther("0.0"),
    //   data:encoded
    // });    

    //const result = await horcrux.redeem(seed,nonce);

    //console.log('----',receipt)
    console.log('----',share)
    //console.log('----',result)
    //console.log('----',tx)

  })  

});
